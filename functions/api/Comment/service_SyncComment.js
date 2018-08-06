const admin = require('firebase-admin')
admin.app()

module.exports = {
    syncCreateNewLike : (locationId, commentId)=>{
        return syncCreateNewLike(locationId, commentId)
    }
}

let db = admin.firestore()

/**
 * Create new Like collection when user'd ctreated Comment document
 * @param {*} commentId 
 */
function syncCreateNewLike(locationId, commentId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection("Like").doc(locationId).collection("LikeOfComment").doc(commentId)
            .set({})
            .then(()=>{
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