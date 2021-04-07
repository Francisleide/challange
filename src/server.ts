import express, { request, response } from 'express';
import routes from './routes';
import'./database';
const app = express();
app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
    return response.json({message: "Generic route."})
})

app.listen('3333', () => {
    console.log(' The server is on ✨✨');
});
