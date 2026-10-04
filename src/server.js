import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/database.js';

import './models/index.js';


import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';


import { notFound, errorHandler } from './middlewares/errorMiddleware.js';


dotenv.config();

const app = express();


app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'שרת ה-Todo פעיל ועובד כראוי',
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


app.use(notFound);    
app.use(errorHandler); 


const PORT = process.env.PORT ;

const startServer = async () => {
  try {

    await connectDB();


    await sequelize.sync();
    console.log('SQLite Models synchronized successfully.');


    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();