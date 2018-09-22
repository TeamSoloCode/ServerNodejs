const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    getSharedCheckPoint: (userSharedId, diaryId, checkPointId)=>{
        return getSharedCheckPoint(userSharedId, diaryId, checkPointId)
    }
}

function getCheckPoint(userSharedId, diaryId, checkPointId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('SharedDiary').doc(userSharedId)
                .collection('AllMySharedDiary').doc(diaryId).get()
                .then((sharedChecker)=>{
                    if(typeof sharedChecker.data().shared != 'undefined'
                            || sharedChecker.data().shared != false){

                        return  db.collection('Diary').doc(diaryId)
                                    .collection('CheckPoint').doc(checkPointId).get()
                    }
                    else{
                        reject("This diary is no longer shared")
                    }
                })
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