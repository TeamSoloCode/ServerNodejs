let firebase = require('firebase')
firebase.app()

module.exports = {
    removeMember: (userId, teamId) =>{
        return removeMember(userId, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function removeMember(userId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            let deleteFromTeam = firebaseRef.child(`Team/${teamId}/${userId}`).remove()
            let deleteFromHasTeam = firebaseRef.child(`HasTeam/${userId}`).remove()
            
            Promise.all([deleteFromTeam, deleteFromHasTeam])
            .then(()=>{
                resolve()
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