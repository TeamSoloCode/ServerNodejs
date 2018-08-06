const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

let serviceSyncAddTouristLocation = require('./service-SyncAddTouristLocation')

/**
 * Export
 */
let output = {
    addTouristLocation: (adminId, data) => {
        return addTouristLocation(adminId, data)
    }
}

module.exports = output

function addTouristLocation(adminId, data) {

    // {
    //     basicInfo: 'abcd',
    //     address:'abcd',
    //     image: 'url',
    //     kindId: 1 <1 hoac 2 hoac 3>,
    //     name: 'abcd',
    //     log: 10.0,
    //     lat: 10.0,
    // }

    return new Promise((resolve, reject) => {
        let touristLocation = {};
        let newData = JSON.parse(data)

        touristLocation.addedDate = new Date().getTime()
        touristLocation.basicInfo = newData.basicInfo
        touristLocation.address = newData.address
        touristLocation.image = newData.image
        touristLocation.kindId = newData.kindId
        touristLocation.lat = newData.lat
        touristLocation.log = newData.log
        touristLocation.name = newData.name
        touristLocation.rateTimes = 0
        touristLocation.stars = 0
        touristLocation.updatedDate = ""
        touristLocation.deleteFlag = 0
        
        //get key of new tourist location
        let newKey = db.collection('TouristLocation').doc().id
        //create firestore reference
        let docRef = db.collection('TouristLocation').doc(newKey);
        docRef.set(touristLocation)
        .then(() => {
            return Promise.all([
                serviceSyncAddTouristLocation.syncAddTouristLocation_Comment(newKey),
                serviceSyncAddTouristLocation.syncAddTouristLocation_Rating(newKey)])
        })
        .then(()=>{
            resolve()
        })
        .catch((reason) => {
            reject(reason)
        });
    })
}