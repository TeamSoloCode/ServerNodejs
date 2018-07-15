const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    addCheckPointDiscription: (userId, diaryId, checkPointId, data)=>{
        return addCheckPointDiscription(userId, diaryId, checkPointId, data)
    }
}

function addCheckPointDiscription(userId, diaryId, checkPointId, data){
    try{
        return new Promise((resolve, reject)=>{
            //{ images:[], description: 'ahihi', createDate: '11/11/99'}
            let desObj = JSON.parse(data)
            db.collection('Diary').doc(userId).collection('Description').doc(diaryId)
                                .collection('CheckPointDescription').doc(checkPointId)
            .set(desObj)
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