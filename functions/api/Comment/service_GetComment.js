const admin = require('firebase-admin')
admin.app()

let Constant = require('../../constant')

module.exports = {
    getUserCommentById: (locationId, userId, commentId) =>{
        return getUserCommentById(locationId, userId, commentId)
    },
    getAllCommentByLocationId: (locationId) =>{
        return getAllCommentByLocationId(locationId)
    }
}

let db = admin.firestore()

function getUserCommentById(locationId, userId, commentId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('Comment').doc(locationId).collection(commentId).where('userId','==',`${userId}`).get()
            .then((snap) => {
                resolve(snap.docs[0].data())
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

function getAllCommentByLocationId(locationId){
    try{
        return new Promise((resolve, reject)=>{
            let result = []
            let collectionLength
            let count = 0
            db.collection('Comment').doc(locationId).getCollections()
            .then((snap) => {
                collectionLength = snap.length
                snap.forEach(collection => {
                    collection.get().then(snapshot => {
                        result.push(snapshot.docs[0].data())
                        count++              
                        if(count == collectionLength)
                            resolve(result)  
                    })
                    .catch(reason => {
                        reject(reason)
                    });
                  });
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