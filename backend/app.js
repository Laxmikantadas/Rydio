const express=require('express')
require('dotenv').config()
const connectdb=require('./db/db.js')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const userRoute=require('./routers/user.route.js')
const app=express()
connectdb()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/users',userRoute)

module.exports=app