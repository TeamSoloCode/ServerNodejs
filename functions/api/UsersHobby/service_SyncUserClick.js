const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

/**
 * Export
 */
module.exports = {
    syncUserClick: (locationId, userId) =>{
        return syncUserClick(locationId, userId)
    }
}


/**
 * Đồng bộ click của user để gợi ý địa điểm
 * @param {*} locationId
 * @param {*} userId
 */
function syncUserClick(locationId, userId){
    try{
        return new Promise((resolve, reject)=>{
            

            // let date = new Date()
            // ref.child(`TouristLocation/${locationId}/kindId/`).once('value')
            // .then((kindId)=>{
            //     ref.child(`Hobby/${userId}/${date.getMonth() + 1}/${kindId.val()}`).once('value')
            //     .then((oldValue)=>{
            //         let updateHobby = {}
            //         updateHobby[`Hobby/${userId}/${date.getMonth() + 1}/${kindId.val()}`] = oldValue.val() + 1
            //         ref.update(updateHobby)
            //         .then((snap)=>{
            //             reject(reason.toString())
            //         })
            //         .catch((reason)=>{
            //             reject(reason.toString())
            //         })
            //     })
            //     .catch((reason)=>{
            //         reject(reason.toString())
            //     })
            // })
            // .catch((reason)=>{
            //     reject(reason.toString())
            // })
        })
    }
    catch(err){
        throw err
    }
}

function abc(){

}
