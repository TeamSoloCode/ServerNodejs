const admin = require('firebase-admin')
admin.app()


module.exports = {
    createDiary: (userId)=>{
        return createDiary(userId)
    }
}

let db = admin.firestore()

function createDiary(userId){
    try{
        return new Promise((resolve, reject)=>{
            let diarysNewKey = db.collection('Diary').doc().id
            let diaryProfile = {
                name: 'My new diary',
                description: '',
                image:'',
                createDate: new Date().getTime(),
                endDate: '',
                updateDate: '',
                distance: 0,
                checkPoint: 0,
                deleteFlag: 0
            }
            
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