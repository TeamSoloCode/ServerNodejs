const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser')
const serviceAccount = require('./firebase-web.json')

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
    apiKey: "AIzaSyCDhqmsyxGYMOxkI1TUbDPccTrmIAJxyY0",
    authDomain: "fir-hwai.firebaseapp.com",
    databaseURL: "https://fir-hwai.firebaseio.com",
    projectId: "fir-hwai",
    storageBucket: "fir-hwai.appspot.com",
    messagingSenderId: "259860662440"
});
/**
 * firebase firestore
 */
let admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyCDhqmsyxGYMOxkI1TUbDPccTrmIAJxyY0",
  authDomain: "firebase-hwai.firebaseapp.com",
  databaseURL: "https://firebase-hwai.firebaseio.com",
  projectId: "firebase-hwai",
  storageBucket: "firebase-hwai.appspot.com",
  messagingSenderId: "259860662440"
});

let touristLocation = require('./api/Tourist Location/tourist-location')
let rating = require('./api/Rating/rating')
let userHobby = require('./api/UsersHobby/hobby')
let comment = require('./api/Comment/comment')
let team = require('./api/Team/team')

app.use('/api', [touristLocation, rating, userHobby, comment, team]);

app.listen(3000);
//exports.app = functions.https.onRequest(app);