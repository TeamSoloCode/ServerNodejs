const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser')
const serviceAccount = require('../firebase-web.json')

//let multer = require('');
//let upload = multer();

const app = express();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
//app.use(upload.array()); //bảo mật cao hơn bodyParser bình thường

/**
 * firebase realtime database
 */
const firebaseRealtime = require('firebase');
firebaseRealtime.initializeApp({
    serviceAccount: serviceAccount,
    databaseURL: 'https://cloudfuntion.firebaseio.com/',
});
/**
 * firebase firestore
 */
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


let touristLocation = require('./api-web/Tourist Location/tourist-location');
let rating = require('./api-web/Rating/rating')
let userHobby = require('./api-web/UsersHobby/hobby')

app.use('/api-web', [touristLocation, rating, userHobby]);

app.listen(3000);
//exports.app = functions.https.onRequest(app);
