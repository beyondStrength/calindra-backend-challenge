import { Localization } from "../models/LocalizationInterface"

export class CalculateDistances
{
    static ft_calculate_euclidean_distance (current_location: Localization, next_location: Localization)
    {
        if (!current_location.lat || !next_location.lat)
            return 0;
        const lat = Math.pow(current_location.lat - next_location.lat, 2)
        const lng = Math.pow(current_location.lng - next_location.lng, 2)
        return Math.sqrt(lat + lng)
    }
}
