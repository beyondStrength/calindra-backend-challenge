let controller = require('./controller');
const express = require('express');
const app = express();
const port = 8000;

async function ft_get_coordinates(address)
{
    return await controller.geocode(address);
}

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
