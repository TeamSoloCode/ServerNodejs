const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')

let serviceAddComment = require('./service-AddComment')
let serviceGetComment = require('./service_GetComment')
let serviceEditComment = require('./service-EditComment')

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

router.post('/UpdateComment', (req, res) => {
    try{
        try{
            let userId = req.body.locationId
            let locationId = req.body.commentId
            let comment = req.body.newComment
            let listImage = req.body.newListImage
            serviceEditComment.editComment(locationId, commentId, newComment, newListImage)
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
    }
    catch(err){

    }
})

router.get('/GetUserCommentById', (req, res)=>{
    try{
        let locationId = req.query.locationId
        let commentId = req.query.commentId
        serviceGetComment.getUserCommentById(locationId, commentId)
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

router.get('/GetCommentByAmount', (req, res)=>{
    try{
        let locationId = req.query.locationId
        let amount = Number(req.query.amount)
        serviceGetComment.getCommentByAmount(locationId, amount)
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