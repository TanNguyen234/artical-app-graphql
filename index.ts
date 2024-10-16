import express, { Express, Request, Response} from 'express';

const app: Express = express();
const port: number = 3000;

app.get('/articals', (req: Request, res: Response) => {
    res.json({
        articals: []
    })
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});