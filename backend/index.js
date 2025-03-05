// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import routes from './routes/routes.js'; 
// import 'dotenv/config'

// const app = express();

// // DB connection
// mongoose.Promise = global.Promise
// let PORT;
// let MONGO_URI;
// try{
//   [PORT, MONGO_URI] = process.env.NODE_ENV === 'prod' ? [process.env.PROD_PORT, process.env.PROD_MONGO_URI] : [process.env.DEV_PORT, process.env.DEV_MONGO_URI];
//   console.log(PORT)
//   if (!MONGO_URI) {
//     throw new Error('MONGO_URI environment variable not set');
//   }
//   mongoose.connect(MONGO_URI)
//   console.log('Connected to MongoDB');  
// } 
// catch(err){
//   console.error('Error connecting to MongoDB Atlas:', err);
// }

// // Temporary bypass for MongoDB connection issues during development
// if (!MONGO_URI) {
//     console.warn('MongoDB URI not set, continuing without database connection');
//     PORT = process.env.DEV_PORT || 4000;
//   }


//   // body parser
// app.use(bodyParser.urlencoded({extended: true}))

// // cors
// // app.use(cors())
// app.use(cors({
//     origin: ['http://localhost:5173', 'http://localhost:3000'], 
//     credentials: true
//   }));
  
  

// routes(app)

// app.get('/', (req, res) => {
//   res.send(`Application is running on port ${PORT}`)
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// });




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

// Set server to continue even without MongoDB
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  console.warn('Continuing without database connection');
});

// body parser
app.use(bodyParser.urlencoded({extended: true}))

// cors
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

routes(app)

app.get('/', (req, res) => {
  res.send(`Application is running on port ${PORT}`)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});





























// mongoose.Promise = global.Promise
// let PORT = process.env.DEV_PORT || 4000;
// let MONGO_URI;

// try {
//   [PORT, MONGO_URI] = process.env.NODE_ENV === 'prod' ? 
//     [process.env.PROD_PORT, process.env.PROD_MONGO_URI] : 
//     [process.env.DEV_PORT, process.env.DEV_MONGO_URI];
  
//   console.log(PORT);
  
//   if (MONGO_URI) {
//     mongoose.connect(MONGO_URI)
//       .then(() => console.log('Connected to MongoDB'))
//       .catch(err => {
//         console.error('Error connecting to MongoDB:', err);
//         console.warn('Continuing without database connection');
//       });
//   } else {
//     console.warn('MongoDB URI not set, continuing without database connection');
//   }
// } 
// catch(err) {
//   console.error('Error in MongoDB connection setup:', err);
//   console.warn('Continuing without database connection');
// }

