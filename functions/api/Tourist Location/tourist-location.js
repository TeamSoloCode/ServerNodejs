const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

let Constant = require('../../constant')
let responseType = require('../../responseType')

let serviceGet = require('./service-get-all-tourist-location');
let serviceAddTest = require('./service-add-tourist-location-test')
let serviceDelete = require('./service-delete-tourist-location')
let serviceEdit = require('./service-edit-tourist-location')
let serviceAddTouristLocation = require('./service_AddTouristLocation')

/**
 * Get all data
 */
router.get('/GetAllTouristLocation', (req, res) => {
    try{
        serviceGet.getAllTouristLocation()
        .then((resultData)=>{
            res.send({resultCode: 1, resultData})
        })
        .catch((reason)=>{
            res.send({resultCode: 0, resultMessage: reason.toString()})
        })
    }
    catch(err){
            res.send({resultCode: -1, resultMassage: err.toString()})
    }
});

/**
 * 
 */
router.get('/GetAllTouristLocationNotBeDeleted', (req, res) => {
    try{
        serviceGet.getAllTouristLocationNotBeDeleted()
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
});
/**
 * get by Id
 */
router.get('/GetTouristLocationById', (req, res)=>{
    try{
        let id = req.query.id
        serviceGet.getTouristLocationById(id)
        .then((result) => {
            res.send({resultCode: 1, resultData: result})
        })
        .catch((reason) => {
            res.send({resultCode: 0, resultData: reason.toString()})
        })
    }
    catch(err){
        res.send({resultCode: -1, resultData: err.toString()})
   }
})

/**
 * get tourist location detail by id
 */
router.get('/GetTouristLocationDetailById', (req, res)=>{
    try{
        let id = req.query.id
        serviceGet.getTouristLocationDetailById(id)
        .then((result) => {
            res.send({resultCode: 1, resultData: result})
        })
        .catch((reason) => {
            res.send({resultCode: 0, resultData: reason.toString()})
        })
    }
    catch(err){
        res.send({resultCode: -1, resultData: err.toString()})
   }
})
/**
 * add new tourist location
 */
router.post('/AddNewTouristLocationTest',(req, res)=>{
    try{
        serviceAddTest.addTouristLocationTest()
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

router.post('/AddNewTouristLocation',(req, res)=>{
    try{
        let adminId = req.body.adminId
        let data = req.body.data
        serviceAddTouristLocation.addTouristLocation(adminId, data)
        .then(()=>{
            res.send(responseType(Constant.resultCode.SUCCESSFUL, Constant.touristLocation.add.success.ADD_TOURIST_LOCATION))
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

/**
 * add tourist loaction detail
 */
router.post('/AddTouristLocationDetail',(req, res)=>{
    try{
        //let adminID = req.body.adminId
        let adminId = null;
        let touristLocationId = req.body.id
        let data = req.body.data
        serviceAddTest.addTouristLocationDetail(adminId, touristLocationId, data)
        .then((result)=> {
            res.send({resultCode: 1, resultData: result})
        })
        .catch((reason)=> {
            res.send({resultCode: 0, resultData: reason.toString()})
        })
    }
    catch(err){
        res.send({resultCode: -1, resultData: err.toString()})
    }
})

/**
 * Update tourist location detail
 */
router.post('/UpdateTouristLocationDetail', (req, res)=>{
    try{
        let id = req.body.id
        let data = req.body.data
        serviceEdit.editTouristLocationDetail(id, data)
        .then((result)=> {
            res.send({resultCode: 1, resultData: result})
        })
        .catch((reason)=> {
            res.send({resultCode: 0, resultData: reason.toString()})
        })
    }
    catch(err){
        res.send({resultCode: -1, resultData: err.toString()})
    }
})

/**
 * delete tourist location
 */
router.post('/DeleteTouristLocation',(req, res)=>{
    try{
        let touristLocationId = req.body.touristLocationId
        let adminId = 0
        serviceDelete.deleteTouristLocation(adminId, touristLocationId)
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