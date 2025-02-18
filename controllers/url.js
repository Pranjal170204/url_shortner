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

    return res.render('home',{
        id:shortId
    })
    return res.json({id : shortId});

}
async function redirectShortId(req, res) {
    try {
        const shortId = req.params.id;  // Extract the shortId from the request parameters
        
        // Find and update the document in the URL collection with the matching shortId
        const entry = await URL.findOneAndUpdate(
            { shortId },  // Find the document with the matching shortId
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date(),  // Add a timestamp for the visit
                    },
                },
            },
            { new: true }  // Return the updated document
        );
        console.log("Found entry:", entry); 
        // Check if the entry exists
        if (!entry) {
            // If no matching URL was found, return a 404 response
            return res.status(404).json({ msg: "Short URL not found" });
        }

        // Redirect to the URL found in the entry
        res.redirect(entry.redirectUrl);
    } catch (err) {
        // If an error occurs, catch it and return a 500 status code
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
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
    getAnalytics,
    redirectShortId
}