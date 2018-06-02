const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let serviceCreateDiary = require('./service_CreateDiary')
let serviceAddRoute = require('./service_AddRoute')
let serviceAddCheckPoint = require('./service_AddCheckPoint')
let serviceAddCheckPointDescription = require('./service_AddCheckPointsDescription')

router.post('/CreateDiary', (req, res)=>{
    try{
        let userId = req.body.userId
        serviceCreateDiary.createDiary(userId)
        .then(()=>{
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

router.post('/AddRoute', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let routes = req.body.routes
        serviceAddRoute.addRoute(userId, diaryId, routes)
        .then(()=>{
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

router.post('/AddCheckPoint', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let checkPoints = req.body.checkPoints
        serviceAddCheckPoint.checkPoint(userId, diaryId, checkPoints)
        .then(()=>{
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

router.post('/AddCheckPointDescription', (req, res)=>{
    try{
        let userId = req.body.userId
        let diaryId = req.body.diaryId
        let checkPointId = req.body.checkPointId
        let description = req.body.description
        serviceAddCheckPointDescription.addCheckPointDiscription(userId, diaryId, checkPointId, description)
        .then(()=>{
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