const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    syncAddCheckPoint: (userId, diaryId, checkPointId)=>{
        return syncAddCheckPoint(userId, diaryId, checkPointId)
    },
    syncUpdateDistance: (userId, diaryId)=>{
        return syncUpdateDistance(userId, diaryId)
    }
}

function syncAddCheckPoint(diaryId){
    try{
        return new Promise((resolve, reject)=>{

            db.collection('Diary').doc(diaryId)
                .collection('CheckPoint').where('deleteFlag', '==', false).get()
                .then((snapShot)=>{
                    return  db.collection('Diary').doc(diaryId)
                                .update({checkPoint: snapShot.docs.length + 1}, { merge: true })
                })
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