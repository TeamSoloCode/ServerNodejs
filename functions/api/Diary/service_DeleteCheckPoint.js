const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    deleteCheckPoint: (userId, diaryId, checkPointId)=>{
        return deleteCheckPoint(userId, diaryId, checkPointId)
    }
}

function deleteCheckPoint(userId, diaryId, checkPointId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('Diary').doc(userId).collection('CheckPoint').doc(diaryId)
                                                .collection('Points').doc(checkPointId)
            .delete()
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