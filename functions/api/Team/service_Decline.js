let firebase = require('firebase')
firebase.app()

let firebaseRef = firebase.database().ref()

module.exports = {
    declineTheInvitation: (userId, teamId)=>{
        return declineTheInvitation(userId, teamId)
    }
}

function declineTheInvitation(userId, teamId){
    try{
        return new Promise((resolve, reject) => {
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