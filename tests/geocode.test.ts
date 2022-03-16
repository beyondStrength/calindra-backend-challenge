const BASE_URL = "http://localhost:8000/v1/api/"

describe("Testing FindNearestAPI", () => {
    test('Must find closest locations between RJ, SP, BA and AM', async () => {
        const axios = require('axios');
        const response = await axios(BASE_URL + '?address=rio de janeiro&address=sao paulo&address=bahia&address=amazonas');
       
        expect(response.data[0].current_location.name).toBe("Rio de Janeiro, State of Rio de Janeiro, Brazil")
        expect(response.data[0].next_location.name).toBe("São Paulo, State of São Paulo, Brazil")
    })

    test('Must return error object because of BAD REQUEST', async () => {
        const axios = require('axios');
        const response = await axios(BASE_URL + '?address=rio de janeiro');

        expect(response.data.title).toBe("BAD REQUEST")
        expect(response.data.code).toBe(400)
        expect(response.data.message).toBe("At least 2 addresses are required.")
    })
})