const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')

let serviceAddComment = require('./service-AddComment')

router.post('/AddComment', (req, res) => {
    try{
        let userId = req.body.userId
        let locationId = req.body.locationId
        let comment = req.body.comment
        let listImage = null
        serviceAddComment.addComment(locationId, userId, comment, listImage)
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