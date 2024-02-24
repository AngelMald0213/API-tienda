import  Express  from "express";
import morgan from "morgan";
import { config } from "dotenv";
import productsRouter from './routes/products.routes.js';
config();

const app = Express();

app.set('view engine', 'ejs');

app.use(Express.json());
app.use(Express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use('/', productsRouter);


export default app;