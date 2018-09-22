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
            db.collection('MyDiary').doc(userId)
            .collection('AllMyDiary').doc(diaryId).get()
            .then((result)=>{
                if(typeof result != 'undefined'){
                    return db.collection('Diary').doc(diaryId)
                            .collection('CheckPoint').doc(checkPointId)
                            .update({deleteFlag : true}, { merge: true })
                }
                else{
                    reject("You're not the owner of this diary")
                }
            })
            .then(()=>{
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