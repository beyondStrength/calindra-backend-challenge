import { LocalizationService } from './services/LocalizationService';
import express from 'express';

const app = express();
const port = 8000;

app.get('/v1/api/', async (req: any, res) => {
    res.send(await LocalizationService.ft_handle_distances(req.query.address))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})