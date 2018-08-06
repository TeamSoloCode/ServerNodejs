const admin = require('firebase-admin')
admin.app()

module.exports = {
    getUserInfomation: (userId) =>{
        return getUserInfomation(userId)
    }
}


function getUserInfomation(userId){
    try{
        return new Promise((resolve, reject)=>{
            admin.auth().getUser(userId)
            .then((userRecord) =>{
                let userInfo = {}
                userInfo.image = userRecord.photoURL
                userInfo.name = userRecord.displayName
                resolve(userInfo)
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