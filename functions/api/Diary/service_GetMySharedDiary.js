const admin = require('firebase-admin')
admin.app()

module.exports = {
    getAllMySharedDiary: (userSharedId)=>{
        return getAllMySharedDiary(userSharedId)
    }
}

let db = admin.firestore()

function getAllMySharedDiary(userSharedId){
    try{
        return new Promise((resolved, reject)=>{
            db.collection('SharedDiary').doc(userSharedId)
                .collection('AllMySharedDiary').where('shared', '==', true).get()
            .then((sharedDiaries)=>{
                let length = sharedDiaries.docs.length
                let count = 0
                let listDiary = []

                if(length == 0){
                    resolved()
                }

                sharedDiaries.forEach((cSnap)=>{
                    let diaryId = cSnap.id
                    console.log(cSnap.data().sharedBy)
                    db.collection('Diary').doc(diaryId).get()
                    .then((snap)=>{
                        let diary = snap.data()
                        diary.id = diaryId
                        diary.sharedBy = cSnap.data().sharedBy

                        listDiary.push(diary)
                        count++
                        if(count == length){
                            resolved(listDiary)
                        }
                    })
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