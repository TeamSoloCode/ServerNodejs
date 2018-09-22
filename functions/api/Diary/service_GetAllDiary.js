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

            db.collection('MyDiary').doc(userId)
                .collection('AllMyDiary').where('deleteFlag', '==', 0).get()
                .then((diarySnapshot)=>{

                    let length = diarySnapshot.docs.length
                    let count = 0
                    let listDiary = []

                    if(length == 0){
                        resolved()
                    }

                    diarySnapshot.forEach((cSnap)=>{
                        let diaryId = cSnap.id
                        db.collection('Diary').doc(diaryId).get()
                        .then((snap)=>{
                            let diary = snap.data()
                            diary.id = diaryId
                            
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