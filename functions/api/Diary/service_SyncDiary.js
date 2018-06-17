const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    syncCheckPointDescription: (userId, diaryId, checkPointId)=>{
        return syncCheckPointDescription(userId, diaryId, checkPointId)
    },
    syncUpdateDistance: (userId, diaryId)=>{
        return syncUpdateDistance(userId, diaryId)
    }
}

function syncCheckPointDescription(userId, diaryId, checkPointId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('Diary').doc(userId).collection('Description').doc(diaryId)
                    .collection('CheckPointDescription').doc(checkPointId)
            .set({})
            .then(()=>{
               resolve()
            })
            .catch((reason)=>{
                reject(reason)
            })
        })
    }
    catch(err){

    }
}
/**
 * 
 * @param {*} userId 
 * @param {*} diaryId 
 */
function syncUpdateDistance(userId, diaryId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('Diary').doc(userId).collection('')
        })
    }
    catch(err){
        throw err
    }
}