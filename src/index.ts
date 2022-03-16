import { LocalizationService } from './services/LocalizationService';
import express from 'express';

const app = express();
const port = 8000;

app.get('/v1/api/', async (req, res) => {
    const addresses = req.query.address
    if (typeof(addresses) === "string")
        res.send({
            title: "BAD REQUEST",
            code: 400,
            message: "At least 2 addresses are required."})
    else
        res.send(await LocalizationService.ft_handle_distances(addresses as string[]))
        
})

app.listen(port, () => {
    console.log(`Find Nearest API listening on port ${port}`)
})