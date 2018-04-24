const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

let serviceGet = require('./service-get-all-tourist-location');
let serviceAdd = require('./service-add-tourist-location')
let serviceDelete = require('./service-delete-tourist-location')

/**
 * Get all data
 */
router.get('/GetAllTouristLocation', (req, res) => {
    try{
        serviceGet.getAllTouristLocation()
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
router.post('/AddNewTouristLocation',(req, res)=>{
    try{
        serviceAdd.addTouristLocation()
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

/**
 * add tourist loaction detail
 */
router.post('/AddTouristLocationDetail',(req, res)=>{
    try{
        //let adminID = req.body.adminId
        let adminId = null;
        let touristLocationId = req.body.id
        let data = req.body.data
        console.log(req.body)
        serviceAdd.addTouristLocationDetail(adminId,touristLocationId, data)
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
        let touristLocationId = req.body.id
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