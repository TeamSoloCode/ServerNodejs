const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()


module.exports = {
    checkPoint: (userId, diaryId, data)=>{
        return checkPoint(userId, diaryId, data)
    }
}

function checkPoint(userId, diaryId, data){
    try{
        return new Promise((resolve, reject)=>{
            // {log:1, lat:2, images:[], description: 'ahihi', createDate: '11/11/99'}
            let checkPointObj = JSON.parse(data)
            //xóa id lúc gửi từ client lên vì không cần thiết
            delete checkPointObj.id

            let checkPointId = db.collection('Diary').doc().id
            db.collection('Diary').doc(userId).collection('CheckPoint').doc(diaryId)
                                                .collection('Detail').doc(checkPointId)
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