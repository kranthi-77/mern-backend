require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors');
const authRoute = require('./router/auth-router')
const paymentRoute = require('./router/payment-router')

const connectDb = require('./utils/db')
const errorMiddleware = require('./middlewares/error-middleware')

app.use(cors())

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json())


app.use('/api/auth',authRoute)
app.use("/api/payment", paymentRoute)


app.use(errorMiddleware)

//app.get('/',(req,res)=>{
 //   res.status(200).send('welcome')
//})

//app.get('/register',(req,res)=>{
  //  res.status(200).send('Register please')
//})

const PORT = process.env.PORT || 3000;  
connectDb().then(()=>{
    app.listen(PORT ,()=>{
        console.log(`server running at ${PORT}`)
    })
})

