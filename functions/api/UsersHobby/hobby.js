const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

let serviceSyncUserClick = require('./service_SyncUserClick') 

router.post('/UserClick', (req, res)=>{
    try{
        let locationId = req.body.locationId
        let userId = req.body.userId
        serviceSyncUserClick.syncUserClick(locationId, userId)
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