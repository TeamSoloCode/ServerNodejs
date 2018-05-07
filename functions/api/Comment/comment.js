const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')

let serviceAddComment = require('./service-AddComment')
let serviceGetComment = require('./service_GetComment')

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

router.get('/GetUserCommentById', (req, res)=>{
    try{
        let userId = req.query.userId
        let locationId = req.query.locationId
        let commentId = req.query.commentId
        serviceGetComment.getUserCommentById(locationId, userId, commentId)
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

router.get('/GetAllCommentByLocationId', (req, res)=>{
    try{
        let locationId = req.query.locationId
        serviceGetComment.getAllCommentByLocationId(locationId)
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