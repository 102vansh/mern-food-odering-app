const express = require('express')
const dotenv = require('dotenv')
const { urlencoded } = require('body-parser')
require('./db/conn')
const cookieparser = require('cookie-parser')
const userroute = require('./router/user.router')
const cors = require('cors')
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const{errormiddleware} = require('./middleware/error')
const foodrouter = require('./router/food.router')
const cartrouter = require('./router/cart.toute')
const orderrouter = require('./router/order.route')
const app = express()
dotenv.config({'path': './config/config.env'})
const port = process.env.port
app.use(express.json())
app.use(urlencoded({extended: true}))

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
app.use(fileupload({useTempFiles: true,
    tempFileDir: '/tmp/',
}))

app.use('/api/v1/user',userroute)
app.use('/api/v1/food',foodrouter)
app.use('/api/v1/cart',cartrouter)
app.use('/api/v1/order',orderrouter)
app.use(errormiddleware)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
