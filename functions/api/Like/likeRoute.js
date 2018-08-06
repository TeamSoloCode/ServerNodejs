const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let serviceLike = require('./service_Like')
let serviceDislike = require('./service_Dislike')

router.post('/Like', (req, res)=>{
    try{
        let userId = req.body.userId
        let commentId = req.body.commentId
        let locationId = req.body.locationId
        serviceLike.like(userId, commentId, locationId)
        .then(()=>{
            res.send(responseType(Constant.resultCode.SUCCESSFUL, ""))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.inviteMember.fail.INVITATION))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/Dislike', (req, res)=>{
    try{
        let userId = req.body.userId
        let commentId = req.body.commentId
        let locationId = req.body.locationId
        serviceDislike.disLike(userId, commentId, locationId)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, ""))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.inviteMember.fail.INVITATION))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

module.exports = router