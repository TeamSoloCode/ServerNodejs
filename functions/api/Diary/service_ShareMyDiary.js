const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()
let isRealUser = require('./service_CheckIsRealUser')

module.exports = {
    shareDiary: (userId, userSharedEmail, diaryId)=>{
        return shareDiary(userId, userSharedEmail, diaryId)
    }
}

function shareDiary(userId, userSharedEmail, diaryId){
    try{
        return new Promise((resolve, reject)=>{
            let userSharedId;
            let sharedBy;
            isRealUser.isUser(userId ,userSharedEmail).then((result)=>{
                if(result == 0){
                    resolve(-1)
                }
                else if(result == -1){
                    resolve(0)
                }


                userSharedId = result.userShareId
                sharedBy = result.sharedBy


                return db.collection('MyDiary').doc(userId)
                            .collection('AllMyDiary').doc(diaryId).get()
            })
            .then((result)=>{
                if(typeof result.data() != 'undefined'){
                    return db.collection('SharedDiary').doc(userSharedId)
                        .collection('AllMySharedDiary').doc(diaryId)
                        .set({
                            shared: true,
                            sharedBy: sharedBy
                        })
                }
                else{
                    reject("Can't get diaries you're shared")
                }
            })
            .then(()=>{
                resolve(1)
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