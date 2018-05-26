let firebase = require('firebase')
firebase.app()

module.exports = {
    deleteAllInvitation: (userId) =>{
        return deleteAllInvitation(userId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function deleteAllInvitation(userId){
    try{
        return new Promise((resolve, reject)=>{
            firebaseRef.child(`Invitation/${userId}`).remove()
            .then(()=>{
                resolve(1)
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