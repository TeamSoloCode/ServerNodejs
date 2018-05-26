let firebase = require('firebase')
firebase.app()

let syncTeamModule = require('./service_SyncTeamModule')
let hasTeam = require('./service_HasTeam')

module.exports = {
    deleteTeam: (leaderId, teamId) =>{
        return deleteTeam(leaderId, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function deleteTeam(leaderId, teamId){
    try{
        return new Promise((resolve, reject) => {
            syncTeamModule.syncDeleteTeam(leaderId, teamId)
            .then((result)=>{
                resolve(result)
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