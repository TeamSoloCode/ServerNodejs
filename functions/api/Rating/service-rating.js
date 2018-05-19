const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

let serviceSyncRatingStar = require('./service-SyncRatingStar')
/**
 * Export
 */
module.exports = {
    rating: (locationId, userId, stars) =>{
        return rating(locationId, userId, stars)
    },
    deleteRating: (locationId, userId, stars) =>{
        return deleteRating(locationId, userId, stars)
    }
}

function rating(locationId, userId, stars){
    try{
        return new Promise((resolve, reject)=>{
            if(stars > 5 || stars < 1){
                reject("Star must be < 5 && > 1")
                return
            }
            
            let update = {}
            update[userId] = stars
            // Get a new write batch
            var batch = db.batch();
            // Set the value of 'NYC'
            var nycRef = db.collection('Rating').doc(locationId);
            batch.update(nycRef, update);
            //commit update
            batch.commit().then(function () {
                resolve()
                serviceSyncRatingStar.syncRatingStar(locationId)
            })
            .catch((reason) => {
                reject(reason)
            })

        })
    }
    catch(err){
        throw err
    }
}

function deleteRating(locationId, userId, stars){
    try{
        return new Promise((resolve, reject)=>{
            //đồng bộ đánh giá sao
            serviceSyncRatingStar.syncRatingStar(locationId)

            let key = `Rating/${locationId}/${userId}`
            ref.child(key).remove()
            .then(() => {
                resolve("Rating star deleted")
            })
            .catch((reason) => {
                reject(reason)
            });
        })
    }
    catch(err){
        throw err
    }
}