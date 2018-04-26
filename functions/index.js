const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser')
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

const firebaseRealtime = require('firebase');
firebaseRealtime.initializeApp({
    serviceAccount: './firebase-web.json',
    databaseURL: 'https://cloudfuntion.firebaseio.com/'
});




let touristLocation = require('./api-web/Tourist Location/tourist-location');
let rating = require('./api-web/Rating/rating')

app.use('/api-web', [touristLocation, rating]);

app.listen(3000);
//exports.app = functions.https.onRequest(app);
