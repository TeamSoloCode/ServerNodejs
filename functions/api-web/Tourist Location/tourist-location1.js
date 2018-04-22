const express = require('express');
const firebaseRealtime = require('firebase');
const bodyParser = require('body-parser')

var router = express.Router();
firebaseRealtime.initializeApp({
    serviceAccount: './firebase-web.json',
    databaseURL: 'https://cloudfuntion.firebaseio.com/'
});
//static files
router.use('/tourist_location',express.static('./js/TouristLocation'));

router.use(bodyParser.json() );       // to support JSON-encoded bodiesr
router.use(bodyParser.urlencoded({ extended: true }));// to support URL-encoded bodies

var ref = firebaseRealtime.database().ref();

/**
 * get data for datatable tourist location
 */
router.get('/tourist_location/GetTouristLocationData',function(req, res){
    var listData = [];
    ref.child('test').once('value')
        .then(function(snap){
            snap.forEach(function(childSnap){
                listData.push(JSON.parse(JSON.stringify(childSnap.val())));
            });
        }).then(() =>{
            var len = listData.length;
            res.send(`{"recordsTotal": "${len}","recordsFiltered": "${len}","data": ${JSON.stringify(listData)}}`);
        });
});

/**
 * edit tourist location
 */
router.post('/tourist_location/EditTouristLocation', function(req, res){
    let tlID = req.body.id;
    ref.child(`test/${tlID}`).once('value')
        .then(snap =>{
            res.render('./tourist-location/edittouristlocation.pug',{data: JSON.stringify(snap.val())});
        });
});

/**
 * add tourist location page
 */
let provinceList = [];
let kindoflocation = [];
let newPostID;
let provinceJSON = function(req, res, next){
    newPostID = ref.child('test').push().key;
    provinceList = [];
    ref.child('province').once('value')
    .then(snap =>{
        snap.forEach(childSnap =>{
            provinceList.push(JSON.parse(JSON.stringify(childSnap.val())))
        });
    })
    .then(() =>{
        next();
    });
}

let kindoflocationJSON = function(req, res, next){
    kindoflocation = [];
    ref.child('kindoflocation').once('value')
    .then(snap =>{
        snap.forEach(childSnap =>{
            kindoflocation.push(JSON.parse(JSON.stringify(childSnap.val())))
        });
    })
    .then(() =>{
        next();
    });
}

let endPoint = function(req, res){
    res.render('./tourist-location/addtouristlocation',{newID: newPostID, provinceList: provinceList, kindoflocation: kindoflocation});
}
router.get("/tourist_location/AddTouristLocation",[provinceJSON, kindoflocationJSON, endPoint]);

/**
 * tourist location index
 */
router.get('/tourist_location', function(req, res){
    res.render('./tourist-location/tourist-location.pug',{title:'Tourist Location'});
});

module.exports = router;