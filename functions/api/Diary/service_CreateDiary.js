const admin = require('firebase-admin')
admin.app()


module.exports = {
    createDiary: (userId, diarysName, diarysImage)=>{
        return createDiary(userId, diarysName, diarysImage)
    }
}

let db = admin.firestore()

function createDiary(userId, diarysName, diarysImage){
    try{
        return new Promise((resolve, reject)=>{
            let diarysNewKey = db.collection('Diary').doc().id
            let diaryProfile = {
                name: diarysName,
                description: '',
                image: diarysImage,
                createDate: new Date().getTime(),
                endDate: '',
                updateDate: '',
                distance: 0,
                checkPoint: 0,
                deleteFlag: 0
            }
            
            db.collection('Diary').doc(diarysNewKey).set(diaryProfile)
            .then(()=>{
                return db.collection('MyDiary').doc(userId)
                        .collection('AllMyDiary').doc(diarysNewKey)
                        .set({deleteFlag: 0})
            })
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