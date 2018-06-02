const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    isLiked: (userId, commentId, locationId)=>{
        return isLiked(userId, commentId, locationId)
    }
}

function isLiked(userId, commentId, locationId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('Comment').doc(locationId).collection('CommentOfLocation')
            .where(`like.${userId}`,'==','1').get()
            .then((snap)=>{
                let check = snap.docs[0]
                if(typeof check == 'undefined' || check == null){
                    resolve(false)
                }
                else{
                    resolve(check)
                }
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