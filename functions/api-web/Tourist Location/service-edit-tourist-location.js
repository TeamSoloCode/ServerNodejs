const firebaseRealtime = require('firebase')
firebaseRealtime.app()

let Constant = require('../../constant')
let serviceGet = require('./service-get-all-tourist-location')
/**
 * Export
 */
let output = {
    editTouristLocation: (adminId, touristLocationId) => {
        return editTouristLocation(adminId, touristLocationId)
    }
}
module.exports = output

let ref = firebaseRealtime.database().ref();

/**
 * edit tourist location
 * @param {*} adminId 
 * @param {*} touristLocationId 
 */
function editTouristLocation(adminId, touristLocationId, updateObject) {
    return new Promise((resolve, reject) => {
        serviceGet.getTouristLocationById(touristLocationId)
            .then((result) => {
                let data = JSON.parse(JSON.stringify(result))
                let touristLocation = data[touristLocationId]

                let date = new Date()
                touristLocation.basicInfo = updateObject.basicInfo
                touristLocation.image = updateObject.image
                touristLocation.kindId = updateObject.image
                touristLocation.lat = updateObject.image
                touristLocation.log = updateObject.image
                touristLocation.name = updateObject.image
                touristLocation.updatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}<br/>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}s`

                //updating
                let updates = {};
                updates['TouristLocation/' + touristLocationId] = touristLocation;
                ref.update(updates).then(() => {
                    resolve(Constant.EDIT_TOURIST_LOCATION_SUCCESS)
                })
                .catch((reason) => {
                    reject(reason)
                });
            })
            .catch((reason) => {
                reject(reason)
            })
    })
}
