const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    createDiary: (userId)=>{
        return createDiary(userId)
    }
}

function createDiary(userId){
    try{
        return new Promise((resolve, reject)=>{
            let diaryProfile = {
                name: '',
                description: '',
                image:'',
                createDate: FirebaseFirestore.FieldValue.serverTimestamp,
                endDate: '',
                updateDate: '',
                distance: 0, //km
                checkPoint: 0
            }
            
            let diarysNewKey = db.collection('Diary').doc().id
            db.collection('Diary').doc(userId).collection('AllMyDiary').doc(diarysNewKey).set(diaryProfile)
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