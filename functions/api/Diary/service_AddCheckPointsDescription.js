const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    addCheckPointDiscription: (userId, diaryId, checkPointId, description)=>{
        return addCheckPointDiscription(userId, diaryId, checkPointId, description)
    }
}

function addCheckPointDiscription(userId, diaryId, checkPointId, description){
    try{
        return new Promise((resolve, reject)=>{
            //{ images:[], description: 'ahihi' }
            let desObj = JSON.parse(description)
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