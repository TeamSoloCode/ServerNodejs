const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let service_UpdateUserProfile = require('./service_UpdateUserProfile')
let serviceGetMyProfile = require('./service_GetMyProfile')

router.post('/GetMyProfile', (req, res)=>{
    try{
        let userEmail = req.body.userEmail
        serviceGetMyProfile.getMyProfile(userEmail)
        .then((result)=>{
            res.send(responseType(Constant.resultCode.OK, result))
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

router.post('/UpdateUserProfile', (req, res)=>{
    try{
        let userId = req.body.userId
        let displayName = req.body.displayName
        let phoneNumber = req.body.phoneNumber
        service_UpdateUserProfile.updateUserProfile(userId, displayName, phoneNumber)
        .then((result)=>{
            if(result == 1){
                res.send(responseType(Constant.resultCode.SUCCESSFUL,
                    Constant.userProfile.success.update.UPDATE_PROFILE))
            }
        })
        .catch((reason)=>{
            console.log(reason.toString())
            res.send(responseType(Constant.resultCode.DATABASE_EXCEPTION, reason.toString()))
        })
    }
    catch(err){
        console.log(err.toString())
        res.send(responseType(Constant.resultCode.EXCEPTION, err.toString()))
    }
})

module.exports = router