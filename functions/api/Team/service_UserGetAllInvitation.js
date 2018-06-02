let firebase = require('firebase')
firebase.app()

module.exports = {
    getAllInvitation: (userId) => {
        return getAllInvitation(userId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function getAllInvitation(userId){
    try{
        return new Promise((resolve, reject)=>{
            firebaseRef.child(`Invitation/${userId}`).once('value')
            .then((myInvitation)=>{
                resolve(myInvitation.val())
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