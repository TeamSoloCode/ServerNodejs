const admin = require('firebase-admin')
admin.app()

let Constant = require('../../constant')

module.exports = {
    addComment: (locationId, userId, comment, listImage) =>{
        return addComment(locationId, userId, comment, listImage)
    }
}

let db = admin.firestore()

function editComment(locationId, userId, commentId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('Comment').where(`${commentId}.userId`,'==',userId).get()
            .then((snap) =>{
                
                snap.docs[0]
            })
        })
    }
    catch(err){
        throw err
    }
}