const firebaseRealtime = require('firebase')
firebaseRealtime.app()

let serviceGet = require('./service-get-all-tourist-location')
/**
 * Export
 */
let output = {
    deleteTouristLocation: (adminId, touristLocationId) => {
        return deleteTouristLocation(adminId, touristLocationId)
    }
}
module.exports = output

let ref = firebaseRealtime.database().ref();

/**
 * Delete tourist location
 * @param {*} adminId 
 * @param {*} touristLocationId 
 */
function deleteTouristLocation(adminId, touristLocationId) {
    return new Promise((resolve, reject) => {
        serviceGet.getTouristLocationById(touristLocationId)
            .then((result) => {
                let data = JSON.parse(JSON.stringify(result))
                let value = data[touristLocationId]

                //updating
                value.deleteFlag = 1
                let updates = {};
                updates['TouristLocation/' + touristLocationId] = value;
                ref.update(updates).then(() => {
                    let object = {}
                    object[touristLocationId] = value
                    resolve(object)
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
// function deleteItem(id) {
//     dbRef.child(id).remove()
// }