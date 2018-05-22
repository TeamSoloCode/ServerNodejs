let firebase = require('firebase')
firebase.app()

let syncTeamModule = require('./service_SyncTeamModule')
let hasTeam = require('./service_HasTeam')

let firebaseRef = firebase.database().ref()

module.exports = {
    acceptTheInvitation: (userId, teamId)=>{
        return acceptTheInvitation(userId, teamId)
    }
}

function acceptTheInvitation(userId, teamId){
    try{
        return new Promise((resolve, reject) => {
            hasTeam.hasTeam(userId).then((result)=>{
                if(result == false){
                   syncTeamModule.syncJoinTeam(userId, teamId)
                   .then(()=>{
                        resolve(1)
                   })
                   .catch((reason)=>{
                        reject(reason)
                   })
                }
                else{
                    //đã có team ko dc đồng ý
                    resolve(0)
                }
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