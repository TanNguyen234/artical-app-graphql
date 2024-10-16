import express, { Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import * as database from "./config/database"
import Artical from './models/artical.model';

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.get('/articals', async (req: Request, res: Response): Promise<void> => {
    const articals = await Artical.find({
       deleted: false
    })
    
    res.json({
        articals: articals
    })
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});