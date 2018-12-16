let admin = require('firebase-admin')
admin.app()

module.exports = {
    isRealEmail: (userId, userInvitedEmail) =>{
       return isRealEmail(userId, userInvitedEmail)
    }
}

function isRealEmail(userId, userInvitedEmail){
    try{
        return new Promise((resolve, reject)=>{
            admin.auth().getUserByEmail(userInvitedEmail)
            .then(function(userRecord) {
                console.log('1')
                if(userRecord.uid == userId){
                    resolve(0)
                }
                else{
                    resolve(userRecord.uid)
                } 
            })
            .catch(function(error) {
                resolve(null)
            });
        })
    }
    catch(err){
        throw err
    }
}