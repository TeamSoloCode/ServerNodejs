const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

let serviceSyncLike = require('./service_SyncLike')
module.exports = {
    disLike: (userId, commentId, locationId)=>{
        return disLike(userId, commentId, locationId)
    }
}
/**
 * Add new like
 * @param {*} userId 
 * @param {*} commentId 
 */
function disLike(userId, commentId, locationId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection("Like").doc(locationId).collection("LikeOfLocation").doc(commentId)
                .collection("UsersLiked").doc(userId)
            .update({deleteFlag: 0})
            .then(()=>{
                //đồng bộ số like qua comment
                serviceSyncLike.syncLikeCount(locationId, commentId)
                resolve()
            })
            .catch((reason)=>{
                reject(reason)
            })
        })
    }
    catch(err){
        throw err
    }
}