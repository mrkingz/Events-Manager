import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// import routes from './server/routes';
// import ValidationService from './server/services/ValidationService'

dotenv.config();
const app = express();

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(cookieParser());
 
// app.use(routes.authRoutes);
// app.use(routes.userRoutes);
// app.use(routes.recipeRoutes);
// app.use(routes.categoryRoutes);
// app.use(routes.voteRoutes);
// app.use(routes.reviewRoutes);
// app.use(routes.favouriteRoutes);
// app.use(routes.notificationRoutes);

// app.all('*',ValidationService.unsupportedMethod());

export default app;

