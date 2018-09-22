const admin = require('firebase-admin')
admin.app()



module.exports = {
    getAllCommentOfLocation: (locationId, userIdGetComment, commentId) =>{
        return getAllCommentOfLocation(locationId, userIdGetComment, commentId)
    },
    getCommentByAmount: (locationId, amount)=>{
        return getCommentByAmount(locationId, amount)
    }
}

let db = admin.firestore()

function getAllCommentOfLocation(locationId, userIdGetComment, commentId){
    try{
        return new Promise((resolve, reject)=>{

            //on get new mode
            if(commentId != ""){
                db.collection('Comment').doc(locationId)
                    .collection('CommentOfLocation').doc(commentId).get()
                    .then((snap) => {
                        let listComment = []
                        if(typeof snap.data() != 'undefined'){
        
                            //anh xa object comment
                            let comment = snap.data()
                            //set comment id
                            comment.commentId = snap.id
        
                            parseToComment(comment, userIdGetComment, locationId)
                            .then((commentSnapshot)=>{

                                delete commentSnapshot.userId
                                delete commentSnapshot.deleteFlag

                                listComment.push(commentSnapshot)
                                resolve(listComment)
                            })
                        }
                        else{
                            resolve(listComment)
                        }
                    })
                    .catch((reason)=>{
                        reject(reason)
                    })
            }
            else{
                db.collection('Comment').doc(locationId)
                            .collection('CommentOfLocation').where("deleteFlag", '==', 0).get()
                .then((snap) => {
                    let length = snap.docs.length
                    let listComment = []
                    if(length > 0){
                        let count = 0
                        snap.forEach( childSnap =>{
                            //anh xa object comment
                            let comment = childSnap.data()
        
                            //set comment id
                            comment.commentId = childSnap.id
                            parseToComment(comment, userIdGetComment, locationId)
                            .then((commentSnapshot)=>{
                                delete commentSnapshot.userId
                                delete commentSnapshot.deleteFlag

                                listComment.push(commentSnapshot)
                                count++
                                if(count == length){
                                    resolve(listComment)
                                }
                            })
                        })
                    }else{
                        resolve(listComment)
                    }
                })
                .catch((reason)=>{
                    reject(reason)
                })
            }
        })
    }
    catch(err){
        throw err
    }
}

function parseToComment(comment, userIdGetComment, locationId){
    try{
        return new Promise((resolve, reject)=>{
            let promiseGetUsersCommentInfo = admin.auth().getUser(comment.userId)
            let promiseLikeCheck = db.collection("Like").doc(locationId)
                                        .collection("LikeOfComment").doc(comment.commentId)
                                        .collection("UsersLiked").doc(userIdGetComment).get()
    
            Promise.all([promiseGetUsersCommentInfo, promiseLikeCheck])
            .then((values)=>{
                if(typeof values[1].data() != 'undefined'){
                    if(values[1].data().deleteFlag == 0){
                        comment.liked = true
                    }
                    else
                    {
                        comment.liked = false
                    }
                }
                else{
                    comment.liked = false
                }
                
                if(typeof values[0] != 'undefined'){
                    comment.userName =  values[0].displayName
                    comment.userImage = values[0].photoURL
                }
                else{
                    comment.userName =  "Can't not get user image"
                    comment.userImage = "Can't not get user image"
                }
    
                resolve(comment)
            })
            .catch((reason)=>{
                comment.liked = false
                comment.userName =  "Can't not get user image"
                comment.userImage = "Can't not get user image"
                //console.log(comment)
                resolve(comment)
            })
        })
        
    }
    catch(err){
        throw err
    }
}

function getCommentByAmount(locationId, amount){
    try{
        return new Promise((resolve, reject)=>{
            let result = []
            db.collection('Comment').doc(locationId).collection('CommentOfLocation')
                .orderBy('updatedDate','desc').limit(amount).get()
                .then((snap) => {
                    snap.forEach(comment => {
                        let commentObj = {}
                        commentObj[comment.id] = comment.data()
                        result.push(commentObj)
                    })
                    resolve(result)
                })
                .catch(reason => {
                    reject(reason)
                });
            })
    }
    catch(err){
        throw err
    }
}