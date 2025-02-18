const express=require('express')
const app=express()
const path=require('path')
const router=require('./routes/url')
const staticRoute=require('./routes/staticRoute')
const {connectDB}=require('./connect')
const PORT=8001;
const URL=require('./models/url')
app.set('view engine',"ejs")

app.set('views',path.resolve('./views'))
app.use(express.json()) 
app.use(express.urlencoded({extended:false}));
connectDB('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log("Database connected successfully")
})
app.use('/',staticRoute)

app.use('/url',router)


app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})
  
