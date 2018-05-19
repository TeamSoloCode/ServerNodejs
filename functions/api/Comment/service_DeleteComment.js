const admin = require('firebase-admin')
admin.app()

module.exports = {
    deleteComment: (locationId, userId, commentId) =>{
        return deleteComment(locationId, userId, commentId)
    }
}

let db = admin.firestore()

function deleteComment(locationId, userId, commentId){
    try{
        return new Promise((resolve, reject)=>{
            let commentRef = db.collection('Comment').doc(locationId)
                                .collection('CommentOfLocation').doc(commentId);

            commentRef.get().then((snap)=>{
                if(userId === snap.data().userId){
                    commentRef.delete().then(()=>{
                        resolve()
                    })
                    .catch((reason)=>{
                        reject(reason)
                    })
                }
                else{
                    reject()
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