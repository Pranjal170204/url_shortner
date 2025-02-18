const express=require('express')
const {generateShortURL,getAnalytics, redirectShortId}=require('../controllers/url')
const router=express.Router();

router.post('/',generateShortURL);

router.get('/getAnalytics/:shortId',getAnalytics);
router.get('/:id',redirectShortId);

module.exports=router;  