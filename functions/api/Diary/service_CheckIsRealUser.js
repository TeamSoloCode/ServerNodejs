let admin = require('firebase-admin')
admin.app()

module.exports = {
    isUser: (userShareId,userSharedEmail) =>{
       return isUser(userShareId, userSharedEmail)
    }
}

function isUser(userShareId,userSharedEmail){
    try{
        return new Promise((resolve, reject)=>{

            admin.auth().getUserByEmail(userSharedEmail)
            .then(function(userRecord) {
               if(userRecord.email != null || typeof userRecord.email != 'undefined'){
                    if(userRecord.uid == userShareId){
                        resolve(-1)
                    }
                    else{

                        admin.auth().getUser(userShareId)
                        .then((userInfo)=>{
                            resolve({sharedBy: userInfo.email, userShareId: userRecord.uid})
                        })

                    }  
               }
               else{
                   resolve(0)
               }
            })
            .catch(function(error) {
                reject(error.toString())
            });
        })
    }
    catch(err){
        throw err
    }
}