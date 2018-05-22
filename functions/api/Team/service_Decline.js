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
                resolve()
            })
            .catch((reason)=>{
                reject()
            })
        })
    }
    catch(err){
        throw err
    }
}