import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './utils/errorHandler';
import { config } from './configs/config';
import cors from "cors";
const app = express();

mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
  

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('API is running..');
}
);

app.use(errorHandler);

export default app;
