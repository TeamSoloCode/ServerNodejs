const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()


module.exports = {
    checkPoint: (userId, diaryId, checkPoints)=>{
        return checkPoint(userId, diaryId, checkPoints)
    }
}

function checkPoint(userId, diaryId, checkPoints){
    try{
        return new Promise((resolve, reject)=>{
            // {log:1, lat:2, discriptionId: null}
            let checkPointObj = JSON.parse(checkPoints)
            let checkPointId = db.collection('Diary').doc().id
            checkPointObj['discriptionId'] = checkPointId
            db.collection('Diary').doc(userId).collection('CheckPoint').doc(diaryId)
                                                .collection('Points').doc(checkPointId)
            .set(checkPointObj)
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