const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    getAllMySharedDiarysCheckPoint: (userSharedId, diaryId)=>{
        return getAllMySharedDiarysCheckPoint(userSharedId, diaryId)
    }
}

function getAllMySharedDiarysCheckPoint(userSharedId, diaryId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('SharedDiary').doc(userSharedId)
                .collection('AllMySharedDiary').doc(diaryId).get()
                .then((sharedChecker)=>{
                    if(typeof sharedChecker.data().shared != 'undefined' || sharedChecker.data().shared != false){
                        return  db.collection('Diary').doc(diaryId)
                                    .collection('CheckPoint')
                                    .where("deleteFlag",'==',false).get()
                    }
                    else{
                        reject("This diary is no longer shared")
                    }
                })
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