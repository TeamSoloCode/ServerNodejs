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

            db.collection('MyDiary').doc(userId)
                .collection('AllMyDiary').doc(diaryId).get()
                .then((snapShot)=>{
                    if(typeof snapShot.data() != 'undefined'){
                        return  db.collection('Diary').doc(diaryId)
                                    .collection('CheckPoint')
                                    .where("deleteFlag",'==',false).get()
                    }
                    else{
                        reject("You're not the owner of this diary")
                    }
                })
                .then((result)=>{
                    let count = 0;
                    let len = result.docs.length
                    let listCheckPoint = []

                    if(result.docs.length == 0){
                        resolve(listCheckPoint)
                    }

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