
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes.js';
import 'dotenv/config'

const app = express();

// DB connection
mongoose.Promise = global.Promise
let PORT = process.env.DEV_PORT || 4000;
let MONGO_URI;

try {
  [PORT, MONGO_URI] = process.env.NODE_ENV === 'prod' 
    ? [process.env.PROD_PORT, process.env.PROD_MONGO_URI] 
    : [process.env.DEV_PORT, process.env.DEV_MONGO_URI];
  
  console.log(`Server will run on port ${PORT}`);
  
  if (MONGO_URI) {
    // Add a connection promise with timeout
    const connectWithRetry = async () => {
      console.log('MongoDB connection with retry');
      try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
      } catch (err) {
        console.error('MongoDB connection error:', err);
        console.warn('Continuing without database connection');
      }
    };
    
    // Call connect with retry
    connectWithRetry();
  } else {
    console.warn('MongoDB URI not set, continuing without database connection');
  }
} 
catch(err) {
  console.error('Error in connection setup:', err);
}

// Set server to continue even without MongoDB -- closed for now
// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
//   console.warn('Continuing without database connection');
// });


//set up mongo for render
mongoose.connect(MONGO_URI, PORT,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.warn('Continuing without database connection');
});





// body parser
app.use(bodyParser.urlencoded({extended: true}))

// cors -- originally used for development
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000'],
//   credentials: true
// }));


//for production
app.use(cors({
  origin: ['https://skin-cancer-detection-app.onrender.com', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

routes(app)

app.get('/', (req, res) => {
  res.send(`Application is running on port ${PORT}`)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});







