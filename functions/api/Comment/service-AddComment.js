const admin = require('firebase-admin')
admin.app()

let Constant = require('../../constant')

module.exports = {
    addComment: (locationId, userId, comment, listImage) =>{
        return addComment(locationId, userId, comment, listImage)
    }
}

let db = admin.firestore()
function addComment(locationId, userId, comment, listImage){
    try{
        let date = new Date()
        let commentRef = db.collection('Comment').doc()
        //tạo đối tượng comment của location
        let pushData = {}
        //
        let commentObj = {
            userId: userId,
            comment: comment,
            updatedDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}<br/>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}s`,
            image: [1,2,3],
            like: 0
        }
        //lấy id mới của firestore
        pushData[commentRef.id] = commentObj
        return new Promise((resolve, reject)=>{
            db.collection('Comment').doc(locationId).get()
            .then((snapshot)=>{
                let checkNull = snapshot.data();
                if(typeof checkNull == "undefined" || typeof checkNull == null){
                    console.log('null')
                    commentRef.set(pushData)
                    .then(()=>{
                        resolve("Up comment success")
                    })
                    .catch((reason)=>{
                        reject(reason)
                    })
                }
                else{
                    // Get a new write batch
                    let batch = db.batch();
                    let newCommentRef = db.collection('Comment').doc(locationId)
                    batch.update(newCommentRef, pushData);
                    //commit update
                    batch.commit().then(function () {
                        resolve("Up comment success")
                    })
                    .catch((reason) => {
                        reject(reason)
                    })
                }
            })
            .catch((reason)=>{
                reject('asdasd')
            })
            
        })
    }
    catch(err){
        throw err 
    }
}