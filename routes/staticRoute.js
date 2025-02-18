const express=require("express")
const router=express.Router();
const URL=require('../models/url')
router.get('/',async (req,res)=>{
    const resp=await URL.find()
    return res.render("home",{
        urls:resp
    });
})


module.exports=router;