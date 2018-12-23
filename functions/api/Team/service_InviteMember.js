const firebase = require('firebase')
firebase.app()

const hasTeam = require('./service_HasTeam')
const isLeader = require('./service_IsLeader')
const serviceGetUser= require('./service_GetUserByEmail')

const firebaseRef = firebase.database().ref()

module.exports = {
    inviteMember: (teamId, userEmail, userInvitedEmail) =>{
        return inviteMember(teamId, userEmail, userInvitedEmail)
    }
}

function inviteMember(teamId, userEmail, userInvitedEmail){
    try{
        let userId = null;
        let userInvitedId = null;
        return new Promise((resolve, reject)=>{
            Promise.all([serviceGetUser.getUserByEmail(userEmail), serviceGetUser.getUserByEmail(userInvitedEmail)])
            .then((ids)=>{
                userId = ids[0];
                userInvitedId = ids[1]

                if(userId != 0 && userInvitedId != 0 && userId != userInvitedId){
                    return Promise.all([hasTeam.hasTeam(userId), isLeader.isLeader(teamId, userId)])
                }
                else{
                    return 0
                }
            })
            .then(results =>{
                if(results[1] == false){    //if user isn't the leader of the team
                    return 0
                }
                else if(results == 0){      //email valid
                    return 2
                }
                else{ // ok
                    return 1
                }
            }).then(result => {
                if (result != 2 && result != 0){
                    let invitation = {}
                    invitation[teamId] = {
                        leader: userId,
                        checked: false
                    }
                    return firebaseRef.child('Invitation').child(userInvitedId).update(invitation)
                }
                else{
                    return result
                }
            })
            .then((result)=>{
                if(result == 2){
                    // email not exist
                    resolve(2)
                }
                else if(result == 0){
                    //not leader
                    resolve(0)
                }

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