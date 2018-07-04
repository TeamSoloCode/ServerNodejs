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
            /*
                comment:{
                    comment: 'abcd',
                    listImage: [i1,i2,i3]
                }
            */
           let date = new Date()
            //tạo key mới cho comment
            let commentKey = db.collection('Comment').doc().id
            let commentObj = JSON.parse(comment)

            //time comment added
            commentObj.addedDate = date.getTime()
            //comment like
            commentObj.like = 0
            //user id
            commentObj.userId = userId
            
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