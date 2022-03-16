import { AdaptLocalization } from "../adapters/AdaptLocalization";
import { Localization } from "../models/LocalizationInterface"
import { CalculateDistances } from './CalculateDistances'

export class LocalizationService 
{  

    static async ft_map_all_localizations(addresses: string[]): Promise<Localization[]>
    {
        return Promise.all(addresses.map(async (localization) => {
            return (await AdaptLocalization.ft_adapt_localization(localization))
        }))
    }
    
    static async ft_handle_distances(addresses: string[]): Promise<any[]>
    {
        const all_localizations: Localization[] = (await this.ft_map_all_localizations(addresses));
        const distances = []
    
        for (let i = 0; i < all_localizations.length-1; i++)
        { 
            for (let j = i+1; j < all_localizations.length; j++)
            {
                distances.push(
                {
                    current_location: all_localizations[i],
                    next_location: all_localizations[j],
                    distance: CalculateDistances.ft_calculate_euclidean_distance(all_localizations[i], all_localizations[j])
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
