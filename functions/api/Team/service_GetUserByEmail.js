let admin = require('firebase-admin')
admin.app()

module.exports = {
    getUserByEmail: (userEmail) =>{
       return getUserByEmail(userEmail)
    }
}

function getUserByEmail(userEmail){
    try{
        return new Promise((resolve, reject)=>{
            admin.auth().getUserByEmail(userEmail)
            .then(function(userRecord) {
                if(typeof userRecord == 'undefined' || typeof userRecord == null){
                    resolve(0)
                }
                else{
                    resolve(userRecord.uid)
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