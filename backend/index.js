import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes'; 
import 'dotenv/config'

const app = express();
const PORT = 4000;

// DB connection
mongoose.Promise = global.Promise

try{
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error('MONGO_URI environment variable not set');
  }
  mongoose.connect(mongoURI)
  console.log('Connected to MongoDB Atlas');  
} 
catch(err){
  console.error('Error connecting to MongoDB Atlas:', err);
}


  // body parser
app.use(bodyParser.urlencoded({extended: true}))

// cors
app.use(cors())

routes(app)

app.get('/', (req, res) => {
  res.send(`Application is running on port ${PORT}`)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});



