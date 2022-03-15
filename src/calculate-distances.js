
exports.ft_calculate_euclidian_distance = function (current_location, next_location)
{
    const lat = Math.pow(current_location.lat - next_location.lat, 2)
    const lng = Math.pow(current_location.lng - next_location.lng, 2)
    return Math.sqrt(lat + lng)
}