// const express = require('express')
// const dotenv = require('dotenv')
// const http = require('http');
// const socketIo = require('socket.io');
// const { urlencoded } = require('body-parser')
// require('./db/conn')
// const cookieparser = require('cookie-parser')
// const userroute = require('./router/user.router')
// const cors = require('cors')
// const fileupload = require('express-fileupload')
// const cloudinary = require('cloudinary').v2
// const{errormiddleware} = require('./middleware/error')
// const foodrouter = require('./router/food.router')
// const cartrouter = require('./router/cart.toute')
// const orderrouter = require('./router/order.route')
// const app = express()
// dotenv.config({'path': './config/config.env'})
// const port = process.env.port

// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Update with your frontend URL
//     methods: ['GET', 'POST']
//   }
// });

// // let riderLocation = { latitude: null, longitude: null };

// // // Simulate rider location updates (In real application, this data should come from rider's device)
// // setInterval(() => {
// //   riderLocation = {
// //     latitude: Math.random() * (37.8 - 37.7) + 37.7,
// //     longitude: Math.random() * (-122.5 - -122.4) + -122.4
// //   };
// //   io.emit('riderLocation', riderLocation);
// // }, 5000);

// // io.on('connection', (socket) => {
// //   console.log('New client connected');
  
// //   // Send current rider location to newly connected client
// //   if (riderLocation.latitude && riderLocation.longitude) {
// //     socket.emit('riderLocation', riderLocation);
// //   }

// //   socket.on('disconnect', () => {
// //     console.log('Client disconnected');
// //   });
// // });

// let riderLocation = { latitude: 40.73061, longitude: -73.935242 };

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   // Emit the rider's location every 5 seconds
//   const interval = setInterval(() => {
//     riderLocation.latitude += 0.0001; // Simulate movement
//     riderLocation.longitude += 0.0001; // Simulate movement
//     socket.emit('riderLocation', riderLocation);
//   }, 5000);

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//     clearInterval(interval);
//   });
// });

// app.use(express.json())
// app.use(urlencoded({extended: true}))

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }))
// app.use(cookieparser())
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })
// app.use(fileupload({useTempFiles: true,
//     tempFileDir: '/tmp/',
// }))

// app.use('/api/v1/user',userroute)
// app.use('/api/v1/food',foodrouter)
// app.use('/api/v1/cart',cartrouter)
// app.use('/api/v1/order',orderrouter)
// app.use(errormiddleware)

// app.listen(port,()=>{
//     console.log(`server is running on port ${port}`)
// })
const express = require('express')
const dotenv = require('dotenv')
const http = require('http');
const socketIo = require('socket.io');
const { urlencoded } = require('body-parser')
require('./db/conn')
const cookieparser = require('cookie-parser')
const userroute = require('./router/user.router')
const cors = require('cors')
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const { errormiddleware } = require('./middleware/error')
const foodrouter = require('./router/food.router')
const cartrouter = require('./router/cart.toute')
const orderrouter = require('./router/order.route')
const app = express()
dotenv.config({ 'path': './config/config.env' })
const port = process.env.PORT || 5000

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Update with your frontend URL
    methods: ['GET', 'POST']
  }
});

let riderLocation = { latitude: 40.73061, longitude: -73.935242 };

io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit the rider's location every 5 seconds
  const interval = setInterval(() => {
    riderLocation.latitude += 0.0001; // Simulate movement
    riderLocation.longitude += 0.0001; // Simulate movement
    socket.emit('riderLocation', riderLocation);
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(cookieparser())
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}))

app.use('/api/v1/user', userroute)
app.use('/api/v1/food', foodrouter)
app.use('/api/v1/cart', cartrouter)
app.use('/api/v1/order', orderrouter)
app.use(errormiddleware)

server.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
