const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    isLiked: (userId, commentId, locationId)=>{
        return new isLiked(userId, commentId, locationId)
    }
}

function isLiked(userId, commentId, locationId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('Comment').doc(locationId).collection('CommentOfLocation')
            .where()
        })
    }
    catch(err){
        throw err
    }
}