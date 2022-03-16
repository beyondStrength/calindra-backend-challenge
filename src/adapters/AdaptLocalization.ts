import { Localization } from "../models/LocalizationInterface"
import { config } from "dotenv";
import NodeGeocoder from 'node-geocoder';

config();

const options: NodeGeocoder.Options = {
    provider: "google",
    apiKey: process.env.API_KEY
};

const geoCoder = NodeGeocoder(options);

export class AdaptLocalization  {
    static async ft_adapt_localization(address: string): Promise<Localization>  {
        const raw_location_data = await geoCoder.geocode(address)
        const localization: Localization = {
            name:   raw_location_data[0].formattedAddress,
            lat:    raw_location_data[0].latitude || 0,
            lng:    raw_location_data[0].longitude || 0
        }
        return localization
    }
}