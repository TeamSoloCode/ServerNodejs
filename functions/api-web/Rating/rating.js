const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

let serviceRating = require('./service-rating')

router.post('/Rating', (req, res)=>{
    try{
        let locationId = req.body.id
        let userId = req.body.userId
        let stars = req.body.stars
        serviceRating.rating(locationId, userId, stars)
        .then((result)=>{
            res.send({resultCode: 1, resultData: result})
        })
        .catch((reason)=>{
            res.send({resultCode: 0, resultData: reason.toString()})
        })
    }
    catch(err){
        res.send({resultCode: -1, resultData: err.toString()})
    }
})

router.post('/DeleteRating', (req, res) =>{
    try{
        let locationId = req.body.id
        let userId = req.body.userId
        let stars = req.body.stars
        serviceRating.deleteRating(locationId, userId, stars)
        .then((result)=>{
            res.send({resultCode: 1, resultData: result})
        })
        .catch((reason)=>{
            res.send({resultCode: 0, resultData: reason.toString()})
        })
    }
    catch(err){
        res.send({resultCode: -1, resultData: err.toString()})
    }
})
module.exports = router