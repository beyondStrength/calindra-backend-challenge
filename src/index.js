const geo_loc_service = require('./geo-localization-service');
const express = require('express');
const app = express();
const port = 8000;

app.get('/v1/api/', async (req, res) => {
    res.send(await geo_loc_service.modules.ft_handle_distances(req.query.address))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
