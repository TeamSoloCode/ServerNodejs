let firebase = require('firebase')
firebase.app()

let hasTeam = require('./service_HasTeam')
let isLeader = require('./service_IsLeader')
let serviceCheckEmail = require('./service_IsRealEmail')

let firebaseRef = firebase.database().ref()
module.exports = {
    inviteMember: (teamId, userId, userInvitedEmail) =>{
        return inviteMember(teamId, userId, userInvitedEmail)
    }
}


function inviteMember(teamId, userId, userInvitedEmail){
    try{
        return new Promise((resolve, reject)=>{
            serviceCheckEmail.isRealEmail(userId, userInvitedEmail).then(userInvitedId =>{
                if(typeof userInvitedId == 'undefined' || userInvitedId == null){
                    resolve(2)
                }
                else if(userInvitedId == 0){
                    resolve(3)
                }
                else{
                    Promise.all([hasTeam.hasTeam(userId), isLeader.isLeader(teamId, userId)]).then(
                        (values)=>{
                            console.log(values)
                            if(values[0] != false && values[1] != false){
                                let invitation = {}
                                invitation[teamId] = {
                                    leader: userId,
                                    checked: false
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