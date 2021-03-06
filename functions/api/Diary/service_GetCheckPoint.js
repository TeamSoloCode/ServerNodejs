const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    getCheckPoint: (userId, diaryId, checkPointId)=>{
        return getCheckPoint(userId, diaryId, checkPointId)
    }
}

function getCheckPoint(userId, diaryId, checkPointId){
    try{
        return new Promise((resolve, reject)=>{
            db.collection('MyDiary').doc(userId)
                .collection('AllMyDiary').doc(diaryId).get()
                .then((snapshot)=>{
                    if(typeof snapshot.data() != 'undefined'){
                        return  db.collection('Diary').doc(diaryId)
                                    .collection('CheckPoint').doc(checkPointId).get()
                    }
                    else{
                        reject("You're not the owner of this diary")
                    }
                })           
                .then((result)=>{
                    //{ images:[], description: 'ahihi', createDate: '11/11/99', kind: 1}
                    let checkPoint = result.data()
                    checkPoint.id = result.id
                    resolve(checkPoint)
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