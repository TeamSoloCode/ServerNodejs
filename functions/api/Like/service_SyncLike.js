const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    syncLikeCount: (locationId, commentId)=>{
        return syncLikeCount(locationId, commentId)
    }
}


function syncLikeCount(locationId, commentId){
    try{
        let commentRef = db.collection('Comment').doc(locationId)
                            .collection("CommentOfLocation").doc(commentId)
        
        let likeRef = db.collection("Like").doc(locationId).collection("LikeOfLocation").doc(commentId)
                        .collection("UsersLiked")

        likeRef.where('deleteFlag', '==', 1).get().then((snapshot)=>{
            commentRef.update({
                like:  snapshot.size() + 1
            })
        })
    }
    catch(err){
        console.log(err.toString())
    }
}