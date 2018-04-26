const firebaseRealtime = require('firebase');
firebaseRealtime.app()

let Constant = require('../../constant')
let serviceSyncRatingStar = require('./service-syncRatingStar')
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
let ref = firebaseRealtime.database().ref()

function rating(locationId, userId, stars){
    try{
        return new Promise((resolve, reject)=>{
            //đồng bộ đánh giá sao
            serviceSyncRatingStar.syncRatingStar(locationId)

            let updates = {}
            updates[`Rating/${locationId}/${userId}`] = stars
            ref.update(updates)
            .then(() => {
                resolve(Constant.success.RATING)
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