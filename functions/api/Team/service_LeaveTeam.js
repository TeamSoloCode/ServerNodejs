let firebase = require('firebase')
firebase.app()

module.exports = {
    leaveTeam: (userId, teamId) =>{
        return leaveTeam(userId, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function leaveTeam(userId, teamId) {
    try{
        return new Promise((resolve, reject)=>{
            let deleteFromTeam = new Promise((resolve1, reject1)=>{
                firebaseRef.child(`Team/${teamId}/${userId}`).remove()
                .then(()=>{
                    resolve1()
                })
                .catch((reason)=>{
                    reject1(reason)
                })
            })

            let deleteFromTeam = new Promise((resolve1, reject1)=>{
                firebaseRef.child(`HasTeam/${userId}`).remove()
                .then(()=>{
                    resolve1()
                })
                .catch((reason)=>{
                    reject1(reason)
                })
            })
            
            Promise.all([deleteFromTeam, deleteFromHasTeam])
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