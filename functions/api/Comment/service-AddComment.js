const admin = require('firebase-admin')
admin.app()

let firebase = require('firebase')
firebase.app()

let serviceSyncComment = require('./service_SyncComment')

module.exports = {
    addComment: (locationId, userId, comment) =>{
        return addCommentRealtime(locationId, userId, comment)
    }
}

let db = admin.firestore()
let realtimeRef = firebase.database().ref()

/**
 * Comment
 * @param {*} locationId 
 * @param {*} userId 
 * @param {*} comment 
 */
function addCommentRealtime(locationId, userId, comment){
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
                let commentKey = realtimeRef.push().key

                let commentObj = JSON.parse(comment)

                //time comment added
                commentObj.addedDate = date.getTime()
                //comment like
                commentObj.like = 0
                //user id
                commentObj.userId = userId

                //delete flag
                commentObj.deleteFlag = 0

                //add comment to firebase realtime
                let addToFirebaseReatime = realtimeRef.child(`Comment/${locationId}/${commentKey}`).set(true)

                //backup data to firestore
                let addToFirestore = db.collection('Comment').doc(locationId)
                                        .collection("CommentOfLocation").doc(commentKey)
                                        .set(commentObj)

                Promise.all([addToFirebaseReatime, addToFirestore])
                .then(()=>{
                    resolve()
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
