const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

let TouristLocation = require('../../models/tourist-location')
let TouristLocationDetail = require('../../models/tourist-location-detail')
let serviceSyncAddTouristLocation = require('./service-SyncAddTouristLocation')
/**
 * Export
 */
let output = {
    addTouristLocation: () => {
        return addTouristLocation()
    },
    addTouristLocationDetail: (adminId,touristLocationId, data) => {
        return addTouristLocationDetail(adminId,touristLocationId, data)
    }
}
module.exports = output

function addTouristLocation() {
    return new Promise((resolve, reject) => {
        let date = new Date()
        let touristLocation = {};
        touristLocation.addedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}<br/>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}s`
        touristLocation.basicInfo = randomChar()
        touristLocation.image = 'url'
        touristLocation.kindId = 1
        touristLocation.lat = Math.random()
        touristLocation.log = Math.random()
        touristLocation.name = randomChar()
        touristLocation.rateTimes = Math.floor(Math.random() * 500)
        touristLocation.stars = Math.floor((Math.random() * 5) + 1)
        touristLocation.updatedDate = ""
        touristLocation.deleteFlag = 0

        //get key of new tourist location
        let newKey = db.collection('TouristLocation').doc().id
        //create firestore reference
        let docRef = db.collection('TouristLocation').doc(newKey);
        docRef.set(touristLocation)
        .then(() => {
            serviceSyncAddTouristLocation.syncAddTouristLocation_Comment(newKey)
            serviceSyncAddTouristLocation.syncAddTouristLocation_Rating(newKey)
            resolve()
        })
        .catch((reason) => {
            reject(reason)
        });
    })
}

/**
 * Add new detail for tourist location
 * @param {*} adminId 
 * @param {*} touristLocationId 
 * @param {*} data 
 */
function addTouristLocationDetail(adminId, touristLocationId, data){
    return new Promise((resolve, reject)=>{
        try{
            let listDetail = JSON.parse(data)
            //create firestore reference
            let docRef = db.collection('TouristLocationDetail').doc(touristLocationId);
            docRef.set(listDetail)
            .then(() => {
                resolve()
            })
            .catch((reason) => {
                reject(reason)
            });
        }
        catch(err){
            throw err
        }
    })
}

function randomChar() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}