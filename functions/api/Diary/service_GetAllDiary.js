const admin = require('firebase-admin')
admin.app()

module.exports = {
    getAllMyDiary: (userId)=>{
        return getAllMyDiary(userId)
    }
}

let db = admin.firestore()

function getAllMyDiary(userId){
    try{
        return new Promise((resolved, reject)=>{
            db.collection("Diary").doc(userId).collection("AllMyDiary")
            .where("deleteFlag", "==", 0).get()
            .then((diarySnapshot)=>{
                let length = diarySnapshot.docs.length
                let count = 0
                let listDiary = []

                if(diarySnapshot.docs.length == 0){
                    resolved(listDiary)
                }

                diarySnapshot.forEach( cSnap =>{
                    let diary = cSnap.data()
                    diary.id = cSnap.id

                    listDiary.push(diary)
                    count++
                    if(count == length){
                        resolved(listDiary)
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