const admin = require('firebase-admin')
admin.app()


module.exports = {
    deleteDiary: (userId, diaryId)=>{
        return deleteDiary(userId, diaryId)
    }
}

let db = admin.firestore()

function deleteDiary(userId, diaryId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('MyDiary').doc(userId)
            .collection('AllMyDiary').doc(diaryId).get()
            .then((snapShot)=>{
                if(typeof snapShot.data() != 'undefined'){
                    return  db.collection('Diary').doc(diaryId)
                                .update({deleteFlag: 1}, { merge: true })
                }
                else{
                    reject("You're not the owner of this diary")
                }
            })
            .then(()=>{
                return db.collection('MyDiary').doc(userId)
                        .collection('AllMyDiary').doc(diaryId)
                        .set({deleteFlag: 1})
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