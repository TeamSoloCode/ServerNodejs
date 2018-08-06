const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

let serviceSyncLike = require('./service_SyncLike')
module.exports = {
    like: (userId, commentId, locationId)=>{
        return like(userId, commentId, locationId)
    }
}
/**
 * Add new like
 * @param {*} userId 
 * @param {*} commentId 
 */
function like(userId, commentId, locationId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection("Like").doc(locationId).collection("LikeOfComment").doc(commentId)
                .collection("UsersLiked").doc(userId)
            .set({
                deleteFlag: 0
            })
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