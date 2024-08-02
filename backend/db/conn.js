// const mongoose = require('mongoose')
// mongoose.connect("mongodb://127.0.0.1:27017/Foodorderdb" ,{
//    // useUnifiedTopology:true,
//    // useNewUrlParser:true
// //    useNewUrlParser: true,
// //   useUnifiedTopology: true,
// }).then(() => {
//     console.log("connection succeful")
// }).catch((e) => {
//     console.log(e)
// })


require('dotenv').config();
const mongoose = require('mongoose');

const dbURI =' mongodb+srv://vanshjain:vansh%402002@mango:27017/foof-db?retryWrites=true&w=majority'

if (!dbURI) {
  console.error("Error: MONGODB_URI is not defined in the .env file.");
  process.exit(1);
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(dbURI).then(() => {
    console.log('MongoDB is connected');
  }).catch(err => {
    console.error('MongoDB connection unsuccessful, retry after 5 seconds. ', err);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

// PORT = 3000
// MONGODB_URI=mongodb+srv://vanshjain:vansh%402002@mango:27017/foof-db?retryWrites=true&w=majority
