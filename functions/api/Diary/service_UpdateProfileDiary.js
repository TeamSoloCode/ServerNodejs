const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    updateProfileDiary: (userId, diaryId, diaryProfile)=>{
        return updateProfileDiary(userId, diaryId, diaryProfile)
    }
}

//TODO: Update distance in sync Diary
/**
 * Update check point profile
 * @param {*} userId 
 * @param {*} diaryId 
 * @param {*} diaryProfile 
 */
function updateProfileDiary(userId, diaryId, diaryProfile){
    try{
        return new Promise((resolve, reject)=>{
            // {
            //     name: 'abc',
            //     description: 'abcdef',
            //     image: 'url',
            //     endDate: '1/2/99',
            // }
            let diaryProfileObj = JSON.parse(diaryProfile)
            //update new updateDate
            diaryProfileObj.updateDate = FirebaseFirestore.FieldValue.serverTimestamp
            db.collection('Diary').doc(userId).collection('AllMyDiary').doc(diaryId)
            .set(diaryProfile,{merge: true})
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