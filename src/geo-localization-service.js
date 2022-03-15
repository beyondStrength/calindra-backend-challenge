const NodeGeocoder = require('node-geocoder')
const CalculateDistances = require('./calculate-distances')
const env = require('ckey')

function Location(_name, _lat, _lng)
{
    this.name = _name,
    this.lat = _lat,
    this.lng = _lng;
}

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: env.API_KEY,
})
 
async function ft_adapt_location(address)
{
    const res = await geocoder.geocode(address)
    const location = new Location(
        res[0].formattedAddress, 
        res[0].latitude,
        res[0].longitude
        )
    
    return location
}

async function ft_map_all_locations(addresses)
{
    return Promise.all(addresses.map(async (location) => {
        return (await ft_adapt_location(location))
    }))
}

async function ft_handle_distances(addresses)
{
    const all_locations = (await ft_map_all_locations(addresses));
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


exports.modules = {
    ft_handle_distances
};
