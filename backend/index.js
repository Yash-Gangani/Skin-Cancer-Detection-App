import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes'; 


const app = express();
const PORT = 4000;

// DB connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/typeDB')

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



