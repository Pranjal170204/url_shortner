const express=require('express')
const app=express()
const router=require('./routes/url')
const {connectDB}=require('./connect')
const PORT=8001;
const URL=require('./models/url')


app.use(express.json()) 
connectDB('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log("Database connected successfully")
})
app.use('/url',router)
app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory: {
                timestamp:new Date(),
            },
        }
    })

    res.redirect(entry.redirectUrl);

})

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})
  
