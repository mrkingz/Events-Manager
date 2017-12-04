import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes';


dotenv.config();
const app = express();

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(cookieParser());

app.use(routes.authRoutes);
app.use(routes.centerRoutes);
app.use(routes.eventRoutes);

app.get('/api', (req, res) => {
    res.send('Server running')
});

app.all('*', (req, res) => {
    res.send('Oops! Request not supported.')
});

export default app;
