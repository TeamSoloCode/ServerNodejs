const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

/**
 * Export
 */
let output = {
    deleteTouristLocation: (adminId, touristLocationId) => {
        return deleteTouristLocation(adminId, touristLocationId)
    }
}
module.exports = output

/**
 * Delete tourist location
 * @param {*} adminId 
 * @param {*} touristLocationId 
 */
function deleteTouristLocation(adminId, touristLocationId) {
    return new Promise((resolve, reject) => {
        db.collection('TouristLocation').doc(touristLocationId)
        .set({
            deleteFlag: 1
        }, { merge: true })
        .then(()=>{
            resolve()
        })
        .catch((reason)=>{
            reject(reason)
        })
    })
}
// function deleteItem(id) {
//     dbRef.child(id).remove()
// }