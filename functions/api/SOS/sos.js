const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let servicePing = require('./service_Ping')

router.post('/Ping', (req, res)=>{
    try{
        let userId = req.body.userId
        let teamId = req.body.teamId
        let pingCode = req.body.pingCode
        servicePing.ping(userId, teamId, pingCode)
        .then((result)=>{
            if(result == -1){
                res.send(responseType(Constant.resultCode.sos.HAVE_TO_WAIT, Constant.ping.ping.WAIT))
            }
            else{
                res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.ping.ping.SUCCESSFUL))
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

module.exports = router