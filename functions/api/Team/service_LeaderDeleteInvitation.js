let firebase = require('firebase')
firebase.app()

module.exports = {
    leaderDeleteInvitation: (userId, teamId) =>{
        return leaderDeleteInvitation(userId, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function leaderDeleteInvitation(userId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            firebaseRef.child(`Invitation/${userId}/${teamId}`).remove()
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