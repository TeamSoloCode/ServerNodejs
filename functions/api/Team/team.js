const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let serviceCreateTeam = require('./service_CreateTeam')
let serviceInviteMember = require('./service_InviteMember')

router.post("/CreateTeam",(req, res)=>{
    try{
        let userId = req.body.userId
        serviceCreateTeam.createTeam(userId)
        .then(()=>{
            res.send(responseType(Constant.resultCode.OK, Constant.team.createTeam.success.CREATE_TEAM))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.createTeam.fail.CREATE_TEAM))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, Constant.team.createTeam.fail.CREATE_TEAM))
    }
})

router.post("/InviteMember",(req, res)=>{
    try{
        let userId = req.body.userId
        let userInvitedId = req.body.userInvitedId
        let teamId = req.body.teamId
        serviceInviteMember.inviteMember(teamId, userId, userInvitedId)
        .then(()=>{
            res.send(responseType(Constant.resultCode.OK, Constant.team.inviteMember.success.INVITATION))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.inviteMember.fail.INVITATION))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, Constant.team.inviteMember.fail.INVITATION))
    }
})

module.exports = router