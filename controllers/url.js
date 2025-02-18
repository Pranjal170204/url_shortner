const shortid=require('shortid')
const URL= require('../models/url')

async function generateShortURL (req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({msg : "url is required"})
    const shortId=shortid();

    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[]
    })


    return res.json({id : shortId});

}

async function getAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({
        shortId

    })
    return res.json({
        totalclicks:result.visitHistory.length,
        anlytics:result.visitHistory
    })

}

module.exports={
    generateShortURL,
    getAnalytics
}