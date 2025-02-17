import { nanoid } from 'nanoid'
const URL= require('../models/url')

async function generateShortURL (req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({msg : "url is required"})
    const shortId=nanoid(8);

    await URL.create({
        
    })
}