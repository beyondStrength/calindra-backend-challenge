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
    
    static async ft_sort_distances(addresses: string[]): Promise<any[]>
    {
        const all_localizations: Localization[] = (await this.ft_map_all_localizations(addresses));
        const localization_combs = []
    
        for (let current = 0; current < all_localizations.length-1; current++)
        { 
            for (let next = current+1; next < all_localizations.length; next++)
            {
                localization_combs.push(
                {
                    current_location: all_localizations[current],
                    next_location: all_localizations[next],
                    distance: CalculateDistances.ft_calculate_euclidian_distance(all_localizations[current], all_localizations[next])
                })
            }
        }
    
        return localization_combs.sort((first_comb, second_comb) => {
            if (first_comb.distance > second_comb.distance) { 
                return 1;
              } else if (first_comb.distance < second_comb.distance) {
                return -1;
              } else {
                return 0; 
              }
        })
    }
}
