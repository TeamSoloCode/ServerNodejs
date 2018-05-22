let firebase = require('firebase')
firebase.app()

let syncTeamModule = require('./service_SyncTeamModule')
let hasTeam = require('./service_HasTeam')
let isLeader = require('./service_IsLeader')

let firebaseRef = firebase.database().ref()
module.exports = {
    inviteMember: (teamId, userId, userInvitedId) =>{
        return inviteMember(teamId, userId, userInvitedId)
    }
}


function inviteMember(teamId, userId, userInvitedId){
    try{
        return new Promise((resolve, reject)=>{
            Promise.all([hasTeam.hasTeam(userId), isLeader.isLeader(teamId, userId)]).then(
                (values)=>{
                    console.log(values)
                    if(values[0] != false && values[1] == true){
                        let invitation = {}
                        invitation[teamId] = {
                            leader: userId
                        }
                        firebaseRef.child('Invitation').child(userInvitedId).update(invitation)
                        .then(()=>{
                            resolve(1)
                        })
                        .catch((reason)=>{
                            reject(reason)
                        })
                    }
                    else{
                        resolve(0)
                    }
                },
                (reason)=>{
                    reject(reason)
                }
            )
        })
    }
    catch(err){
        throw err
    }
}

//TODO:
function checkUserExistence(userInvitedId){
    try{
        return new Promise((resolve, reject)=>{
            
        })
    }
    catch(err){
        throw err
    }
}