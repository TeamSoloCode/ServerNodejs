const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let serviceRating = require('./service-rating')

router.post('/Rating', (req, res)=>{
    try{
        let locationId = req.body.locationId
        let userId = req.body.userId
        let stars = req.body.stars
        serviceRating.rating(locationId, userId, stars)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.OK, Constant.rating.success.RATING))
            }
            else if(result == 0){
                res.send(responseType(Constant.resultCode.rating.WRONG_RATE_VALUE, Constant.rating.wrongRateValue.WRONG_RATE_VALUE))
            }
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/DeleteRating', (req, res) =>{
    try{
        let locationId = req.body.id
        let userId = req.body.userId
        let stars = req.body.stars
        serviceRating.deleteRating(locationId, userId, stars)
        .then(()=>{
            res.send(responseType(Constant.resultCode.OK, Constant.rating.success.DELETE_RATING))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

module.exports = router