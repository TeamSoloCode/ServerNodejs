const functions = require('firebase-functions');
const express = require('express');
const app = express();

const firebaseRealtime = require('firebase');
firebaseRealtime.initializeApp({
    serviceAccount: './firebase-web.json',
    databaseURL: 'https://cloudfuntion.firebaseio.com/'
});

let touristLocation = require('./api-web/Tourist Location/tourist-location');

app.use('/api-web', touristLocation);

app.listen(3000);
//exports.app = functions.https.onRequest(app);
