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
                diarySnapshot.forEach( cSnap =>{
                    listDiary.push({
                        name:cSnap.data().name,
                        image: cSnap.data().image,
                        createDate: cSnap.data().createDate,
                        discription: cSnap.data().description,
                    })
                    count++
                    if(count == length){
                        console.log(listDiary)
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