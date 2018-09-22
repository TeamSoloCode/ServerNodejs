const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let serviceAddComment = require('./service-AddComment')
let serviceGetComment = require('./service_GetComment')
let serviceEditComment = require('./service-EditComment')

router.post('/AddComment', (req, res) => {
    try{
        let userId = req.body.userId
        let locationId = req.body.locationId
        let comment = req.body.comment
        serviceAddComment.addComment(locationId, userId, comment)
        .then(()=>{
            res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.comment.success.addComment.ADD_COMMENT))
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

router.post('/GetAllCommentOfLocation', (req, res)=>{
    try{
        let locationId = req.body.locationId
        let userIdGetComment = req.body.userIdGetComment
        let commentId = req.body.commentId
        serviceGetComment.getAllCommentOfLocation(locationId, userIdGetComment, commentId)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, result))
        })
        .catch((reason)=>{
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
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