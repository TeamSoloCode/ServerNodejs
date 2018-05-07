const admin = require('firebase-admin')
admin.app()

let Constant = require('../../constant')

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
                updatedDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}<br/>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}s`,
                image: [1,2,3],
                like: {
                    userId1: 1,
                    userId2: 2
                }
            }
            
            let newCommentRef = db.collection('Comment').doc(locationId).collection(commentKey).doc('Content')
            //add comment
            newCommentRef.set(commentObj).then(function () {
                resolve("Add comment success")
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