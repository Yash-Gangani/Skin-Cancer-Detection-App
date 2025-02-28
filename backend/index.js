import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes'; 
import 'dotenv/config'

const app = express();

// DB connection
mongoose.Promise = global.Promise
let PORT;
let MONGO_URI;
try{
  [PORT, MONGO_URI] = process.env.NODE_ENV === 'prod' ? [process.env.PROD_PORT, process.env.PROD_MONGO_URI] : [process.env.DEV_PORT, process.env.DEV_MONGO_URI];
  console.log(PORT)
  if (!MONGO_URI) {
    throw new Error('MONGO_URI environment variable not set');
  }
  mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB');  
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



