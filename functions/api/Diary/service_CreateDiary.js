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
            let diarysNewKey = db.collection('Diary').doc().id
            db.collection('Diary').doc(userId).collection('AllMyDiary').doc(diarysNewKey).set({})
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