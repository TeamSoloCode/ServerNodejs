const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

let serviceGet = require('./service-get-all-tourist-location');
let serviceAdd = require('./service-add-tourist-location')
let serviceDelete = require('./service-delete-tourist-location')

router.use(bodyParser.json() );       // to support JSON-encoded bodiesr
router.use(bodyParser.urlencoded({ extended: true }));// to support URL-encoded bodies
/**
 * Get all data
 */
router.get('/GetAllTouristLocation', (req, res) => {
    serviceGet.getAllTouristLocation()
    .then((result)=>{
        res.send({resultCode: 1, result: result})
    })
    .catch((reason)=>{
        res.send({resultCode: 0, result: reason.toString()})
    })
});

/**
 * get by Id
 */
router.get('/GetTouristLocationById', (req, res)=>{
    let id = req.query.id
    serviceGet.getTouristLocationById(id)
    .then((result) => {
        res.send({resultCode: 1, result: result})
    })
    .catch((reason) => {
        res.send({resultCode: 0, result: reason.toString()})
    })
})
/**
 * add new tourist location
 */
router.post('/AddNewTouristLocation',(req, res)=>{
    serviceAdd.addTouristLocation()
    .then((result)=>{
        res.send({resultCode: 1, result: result})
    })
    .catch((reason)=>{
        res.send({resultCode: 0, result: reason.toString()})
    })
})

/**
 * delete tourist location
 */
router.post('/DeleteTouristLocation',(req, res)=>{
    let touristLocationId = req.body.id
    let adminId = 0
    serviceDelete.deleteTouristLocation(adminId, touristLocationId)
    .then((result)=>{
        res.send({resultCode: 1, result: result})
    })
    .catch((reason)=>{
        res.send({resultCode: 0, result: reason.toString()})
    })
})
module.exports = router