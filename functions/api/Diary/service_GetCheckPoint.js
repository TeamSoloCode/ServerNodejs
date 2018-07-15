const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    getCheckPoint: (userId, diaryId, checkPointId)=>{
        return getCheckPoint(userId, diaryId, checkPointId)
    }
}

function getCheckPoint(userId, diaryId, checkPointId){
    try{
        return new Promise((resolve, reject)=>{
            //{ images:[], description: 'ahihi', createDate: '11/11/99'}
            db.collection('Diary').doc(userId).collection('CheckPoint').doc(diaryId)
                                .collection('Detail').doc(checkPointId)
            .get()
            .then((result)=>{
                let checkPoint = result.data()
                checkPoint.id = result.id
               resolve(checkPoint)
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