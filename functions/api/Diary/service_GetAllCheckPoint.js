const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    getAllCheckPoint: (userId, diaryId)=>{
        return getAllCheckPoint(userId, diaryId)
    }
}

function getAllCheckPoint(userId, diaryId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('Diary').doc(userId).collection('CheckPoint').doc(diaryId)
                                .collection('Detail').where("deleteFlag",'==',false)
            .get()
            .then((result)=>{
                let count = 0;
                let len = result.docs.length
                let listCheckPoint = []
                result.forEach( childSnap =>{
                    let checkPoint = childSnap.data()
                    checkPoint.id = childSnap.id
                    listCheckPoint.push(checkPoint)
                    count++
                    if(count == len){
                        resolve(listCheckPoint)
                    }
                })
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