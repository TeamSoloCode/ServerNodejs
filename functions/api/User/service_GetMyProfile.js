let admin = require('firebase-admin')
admin.app()

module.exports = {
    getMyProfile: (userEmail) =>{
       return getMyProfile(userEmail)
    }
}

function getMyProfile(userEmail){
    try{
        return new Promise((resolve, reject)=>{
            admin.auth().getUserByEmail(userEmail)
            .then(function(userRecord) {
                let userInfo = {
                    name: userRecord.displayName,
                    image: userRecord.photoURL,
                    phone: userRecord.phoneNumber
                }
                resolve(userInfo)
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