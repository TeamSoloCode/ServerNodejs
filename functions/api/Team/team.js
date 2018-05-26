const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let serviceCreateTeam = require('./service_CreateTeam')
let serviceInviteMember = require('./service_InviteMember')
let serviceHasTeam = require('./service_HasTeam')
let serviceAccept = require('./service_Accept')
let serviceDecline = require('./service_Decline')
let serviceDeleteTeam = require('./service_DeleteTeam')
let serviceDeleteAllInvitation = require('./service_DeleteAllInvitation')

router.post("/CreateTeam",(req, res)=>{
    try{
        let userId = req.body.userId
        serviceCreateTeam.createTeam(userId)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.OK, Constant.team.createTeam.success.CREATE_TEAM))
            }
            else if(result == 0){
                res.send(responseType(Constant.resultCode.team.ALREADY_HAS_TEAM, Constant.team.hasTeam.ALREADY_HAS_TEAM))
            }
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.createTeam.fail.CREATE_TEAM))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post("/InviteMember",(req, res)=>{
    try{
        let userId = req.body.userId
        let userInvitedId = req.body.userInvitedId
        let teamId = req.body.teamId
        serviceInviteMember.inviteMember(teamId, userId, userInvitedId)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.OK, Constant.team.inviteMember.success.INVITATION))
            }
            else if(result == 0){
                res.send(responseType(Constant.resultCode.team.NOT_LEADER, Constant.team.notLeader.NOT_LEADER))
            }
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

router.get('/HasTeam', (req, res)=>{
    try{
        let userId = req.body.userId
        serviceHasTeam.hasTeam(userId)
        .then((result)=>{
            if(result == false){
                res.send(responseType(Constant.resultCode.team.HAS_NO_TEAM, ""))
            }
            else{
                res.send(responseType(Constant.resultCode.team.ALREADY_HAS_TEAM, Constant.team.hasTeam.ALREADY_HAS_TEAM))
            }
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

router.post('/AcceptTheInvitation', (req, res)=>{
    try{
        let userId = req.body.userId
        let teamId = req.body.teamId
        serviceAccept.acceptTheInvitation(userId, teamId)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.OK, Constant.team.joinTeam.success.JOIN_TEAM))
            }
            else if(result == 0){
                res.send(responseType(Constant.resultCode.team.ALREADY_HAS_TEAM, Constant.team.hasTeam.ALREADY_HAS_TEAM))
            }
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.team.joinTeam.fail.JOIN_TEAM))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.get('/DeclineTheInvitation', (req, res)=>{
    try{
        let userId = req.body.userId
        let teamId = req.body.teamId
        serviceDecline.declineTheInvitation(userId, teamId)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, ""))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.common.TRY_AGAIN))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/DeleteTeam', (req, res)=>{
    try{
        let leaderId = req.body.leaderId
        let teamId = req.body.teamId
        serviceDeleteTeam.deleteTeam(leaderId, teamId)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.OK, ""))
            }
            else if(result == -1){
                res.send(responseType(Constant.resultCode.team.NOT_LEADER, Constant.team.notLeader.NOT_LEADER))
            }
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.common.TRY_AGAIN))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/DeleteAllInvitation', (req, res)=>{
    try{
        let userId = req.body.userId
        serviceDeleteAllInvitation.deleteAllInvitation(userId)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, ""))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, Constant.common.TRY_AGAIN))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

module.exports = router