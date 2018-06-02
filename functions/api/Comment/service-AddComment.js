const admin = require('firebase-admin')
admin.app()

let serviceSyncComment = require('./service_SyncComment')
module.exports = {
    addComment: (locationId, userId, comment, listImage) =>{
        return addComment(locationId, userId, comment, listImage)
    }
}

let db = admin.firestore()
/**
 * Comment
 * @param {*} locationId 
 * @param {*} userId 
 * @param {*} comment 
 * @param {*} listImage 
 */
function addComment(locationId, userId, comment, listImage){
    try{
        return new Promise((resolve, reject)=>{
            let date = new Date()
            //tạo key mới cho comment
            let commentKey = db.collection('Comment').doc().id
            //comment model
            let commentObj = {
                userId: userId,
                comment: comment,
                addedDate: Firestore.FieldValue.serverTimestamp(),
                image: [1,2,3],
                like: 0
            }
            
            let newCommentRef = db.collection('Comment').doc(locationId)
                                    .collection("CommentOfLocation").doc(commentKey)
            //add comment
            newCommentRef.set(commentObj).then(function () {
                //create like collection
                serviceSyncComment.syncCreateNewLike(commentKey)
                .then(()=>{
                    resolve()
                })
                .catch((reason)=>{
                    reject(reason)
                })
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