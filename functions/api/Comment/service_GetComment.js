const admin = require('firebase-admin')
admin.app()

module.exports = {
    getUserCommentById: (locationId, commentId) =>{
        return getUserCommentById(locationId, commentId)
    },
    getCommentByAmount: (locationId, amount)=>{
        return getCommentByAmount(locationId, amount)
    }
}

let db = admin.firestore()

function getUserCommentById(locationId, commentId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('Comment').doc(locationId).collection('CommentOfLocation').doc(commentId).get()
            .then((snap) => {
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

function getCommentByAmount(locationId, amount){
    try{
        return new Promise((resolve, reject)=>{
            let result = []
            let count = 0
            db.collection('Comment').doc(locationId).collection('CommentOfLocation')
                .orderBy('updatedDate','desc').limit(amount).get()
                .then((snap) => {
                    snap.forEach(comment => {
                        let commentObj = {}
                        commentObj[comment.id] = comment.data()
                        result.push(commentObj)
                    })
                    resolve(result)
                })
                .catch(reason => {
                    reject(reason)
                });
            })
    }
    catch(err){
        throw err
    }
}