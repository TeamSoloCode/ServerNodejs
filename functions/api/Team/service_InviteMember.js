const firebase = require('firebase')
firebase.app()

const hasTeam = require('./service_HasTeam')
const isLeader = require('./service_IsLeader')
const serviceCheckEmail = require('./service_IsRealEmail')
const serviceGetUser= require('./service_GetUserByEmail')
const firebaseRef = firebase.database().ref()
module.exports = {
    inviteMember: (teamId, userEmail, userInvitedEmail) =>{
        return inviteMember(teamId, userEmail, userInvitedEmail)
    }
}


function inviteMember(teamId, userEmail, userInvitedEmail){
    try{
        return new Promise((resolve, reject)=>{
            
            serviceGetUser.getUserByEmail(userEmail)
            .then((id) => {
                if(id != 0) {
                   return serviceCheckEmail.isRealEmail(id, userInvitedEmail)  
                } else {
                    return id
                }
            })
            .then(userInvitedId =>{
                if(typeof userInvitedId == 'undefined' || userInvitedId == null){
                    resolve(2)
                    return 2
                }       
                else if(userInvitedId == 0){
                    resolve(3)
                    return 3
                }
                else{
                    return Promise.all([hasTeam.hasTeam(userId), isLeader.isLeader(teamId, userId)])
                }
            }).then(result => {
                    console.log(result)
                    // .then((values)=>{
                    //         console.log(values)
                    //         if(values[0] != false && values[1] != false){
                    //             let invitation = {}
                    //             invitation[teamId] = {
                    //                 leader: userId,
                    //                 checked: false
                    //             }
                    //             firebaseRef.child('Invitation').child(userInvitedId).update(invitation)
                    //             .then(()=>{
                    //                 resolve(1)
                    //             })
                    //             .catch((reason)=>{
                    //                 reject(reason)
                    //             })
                    //         }
                    //         else{
                    //             resolve(0)
                    //         }
                    //     },
                    //     (reason)=>{
                    //         reject(reason)
                    //     }
                    // )
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