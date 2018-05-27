const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    like: (userId, locationId)=>{
        return new like(userId, locationId)
    }
}

function like(userId, locationId){
    try{
        return new Promise((resolve, reject)=>{
            
        })
    }
    catch(err){
        throw err
    }
}