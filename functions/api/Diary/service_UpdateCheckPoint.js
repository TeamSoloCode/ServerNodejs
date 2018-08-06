const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    updateCheckPoint: (userId, diaryId, data)=>{
        return updateCheckPoint(userId, diaryId, data)
    }
}

function updateCheckPoint(userId, diaryId, data){
    try{
        return new Promise((resolve, reject)=>{
            // {log:1, lat:2, images:[], description: 'ahihi', createDate: '11/11/99'}
            let checkPointObj = JSON.parse(data)
            let checkPointId = checkPointObj.id
            //xóa id lúc gửi từ client lên vì không cần thiết
            delete checkPointObj.id
            db.collection('Diary').doc(userId).collection('CheckPoint').doc(diaryId)
                                                .collection('Detail').doc(checkPointId)
            .update(checkPointObj)
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