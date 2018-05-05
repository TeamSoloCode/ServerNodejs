const admin = require('firebase-admin')
admin.app()

//const storageRef = firebase.storage().ref()
const db = admin.firestore()

let Constant = require('../../constant')

module.exports = {
    addDiary: (userId) => {

    }
}

function addDiary(userId){
    db.collection('Diary').doc(userId)
}