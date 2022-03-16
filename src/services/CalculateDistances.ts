import { Localization } from "../models/LocalizationInterface"

export class CalculateDistances
{
    static ft_calculate_euclidian_distance (current_localization: Localization, next_localization: Localization)
    {
        const lat = Math.pow(current_localization.lat - next_localization.lat, 2)
        const lng = Math.pow(current_localization.lng - next_localization.lng, 2)
        return Math.sqrt(lat + lng)
    }
}
