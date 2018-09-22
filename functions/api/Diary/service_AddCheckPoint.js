const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

let syncAddCheckPoint = require('./service_SyncDiary')

module.exports = {
    checkPoint: (userId, diaryId, data)=>{
        return checkPoint(userId, diaryId, data)
    }
}

function checkPoint(userId, diaryId, data){
    try{
        return new Promise((resolve, reject)=>{

            db.collection('MyDiary').doc(userId)
                .collection('AllMyDiary').doc(diaryId).get()
                .then((result)=>{
                    // {log:1, lat:2, images:[], description: 'ahihi', createDate: '11/11/99'}
                    let checkPointObj = JSON.parse(data)
                    //xóa id lúc gửi từ client lên vì không cần thiết
                    delete checkPointObj.id
                    let checkPointId = db.collection('Diary').doc().id

                    if(typeof result != 'undefined'){
                        return db.collection('Diary').doc(diaryId)
                                .collection('CheckPoint').doc(checkPointId)
                                .set(checkPointObj)
                    }
                    else{
                        reject("You're not the owner of this diary")
                    }
                })
                .then(()=>{
                    syncAddCheckPoint.syncAddCheckPoint(diaryId)
                    resolve(1)
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