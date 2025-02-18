const express=require('express')
const {generateShortURL,getAnalytics}=require('../controllers/url')
const router=express.Router();

router.post('/',generateShortURL);

router.get('/getAnalytics/:shortId',getAnalytics);

module.exports=router;  