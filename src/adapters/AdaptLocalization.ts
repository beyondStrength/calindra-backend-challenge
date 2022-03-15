import { Localization } from "../models/LocalizationInterface"
import NodeGeocoder from 'node-geocoder';
require('dotenv').config() 

const options: NodeGeocoder.Options = {
    provider: "google",
    apiKey: process.env.API_KEY
};

const geoCoder = NodeGeocoder(options);

export class AdaptLocalization 
{
    static async ft_adapt_localization(address: string): Promise<Localization>
    {
        
        const res = await geoCoder.geocode(address)
        const localization: Localization = {
            name:   res[0].formattedAddress,
            lat:    res[0].latitude || 0,
            lng:    res[0].longitude || 0
        }
        return localization
    }
}