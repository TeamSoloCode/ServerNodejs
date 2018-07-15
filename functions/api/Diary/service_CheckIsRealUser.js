let admin = require('firebase-admin')
admin.app()

module.exports = {
    isUser: (userId) =>{
       return isUser(userId)
    }
}

function isUser(userId){
    try{
        return new Promise((resolve, reject)=>{
            admin.auth().getUserByEmail(userId)
            .then(function(userRecord) {
               if(userRecord.email != null || typeof userRecord.email != 'undefined'){
                    resolve(1)
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