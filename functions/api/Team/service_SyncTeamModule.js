let firebase = require('firebase')
firebase.app()

module.exports = {
    syncJoinTeam: (userId, teamId) =>{
        return syncJoinTeam(userId, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function syncJoinTeam(userId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            let hasTeam = {};
            hasTeam['/HasTeam/' + userId] = teamId

            //join team sync
            firebaseRef.update(hasTeam)
            .then(()=>{
                resolve()
            })
            .catch((reason)=>{
                reject(reason)
            });
        })
    }
    catch(err){
        throw err
    }
}
