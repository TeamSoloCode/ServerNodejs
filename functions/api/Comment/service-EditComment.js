const admin = require('firebase-admin')
admin.app()

module.exports = {
    editComment: (locationId, commentId, newComment, newListImage) =>{
        return editComment(locationId, commentId, newComment, newListImage)
    }
}

let db = admin.firestore()

function editComment(locationId, commentId, newComment, newListImage){
    try{
        return new Promise((resolve, reject)=>{
            let image = []
            image = JSON.parse(newListImage)
            let commentObj = {
                comment: newComment,
                image: newListImage,
            }
            if(commentObj.comment === ''){
                delete commentObj.comment
            }
            if(image.length === 0){
                delete commentObj.image
            }
            db.collection('Comment').doc(locationId).collection('CommentOfLocation').doc(commentId)
            .set(commentObj, {merge: true})
            .then((snap) =>{
                resolve(snap.data())
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