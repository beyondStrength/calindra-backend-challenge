import { Localization } from "../models/LocalizationInterface"
import NodeGeocoder from "node-geocoder"
import { CalculateDistances } from './CalculateDistances'
import * as env from 'dotenv'

env.config({ path: '../.env' })

const { geocode } = NodeGeocoder({
  provider: 'google',
  apiKey: process.env.API_KEY
})

export class LocalizationService 
{
    static async ft_adapt_location(address: string): Promise<Localization>
    {
        const res = await geocode(address)
        const location: Localization = {
            name:   res[0].formattedAddress,
            lat:    res[0].latitude,
            lng:    res[0].longitude
        }
        return location
    }
    
    static async ft_map_all_locations(addresses: string[]): Promise<Localization[]>
    {
        return Promise.all(addresses.map(async (location) => {
            return (await this.ft_adapt_location(location))
        }))
    }
    
    static async ft_handle_distances(addresses: string[]): Promise<any[]>
    {
        const all_locations: Localization[] = (await this.ft_map_all_locations(addresses));
        const distances = []
    
        for (let i = 0; i < all_locations.length-1; i++)
        { 
            for (let j = i+1; j < all_locations.length; j++)
            {
                distances.push(
                {
                    current_location: all_locations[i],
                    next_location: all_locations[j],
                    distance: CalculateDistances.ft_calculate_euclidian_distance(all_locations[i], all_locations[j])
                })
            }
        }
    
        return distances.sort((current_location, next_location) => {
            if (current_location.distance > next_location.distance) { 
                return 1;
              } else if (current_location.distance < next_location.distance) {
                return -1;
              } else {
                return 0; 
              }
        })
    }
}
