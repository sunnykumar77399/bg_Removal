import 'dotenv/config';
import express from 'express';
import cors from 'cors';   
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';


//app config
const PORT = process.env.PORT || 4000;  
const app = express(); 
await connectDB();

//Initialize middleware
app.use(express.json());
app.use(cors());


//API routes
app.get('/', (req, res) => 
  res.status(200).send('API is running'))
app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));