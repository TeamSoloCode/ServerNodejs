let admin = require('firebase-admin')
admin.app()

module.exports = {
    updateUserProfile: (userId, displayName, phoneNumber) =>{
       return updateUserProfile(userId, displayName, phoneNumber)
    }
}

function updateUserProfile(userId, displayName, phoneNumber){
    try{
        console.log(displayName + " "+ phoneNumber)
        return new Promise((resolve, reject)=>{
            admin.auth().updateUser(userId,{
                phoneNumber: phoneNumber,
                displayName: displayName,
            })
            .then(result => {
                resolve(1)
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