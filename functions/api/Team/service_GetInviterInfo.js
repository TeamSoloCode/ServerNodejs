let firebase = require('firebase')
firebase.app()

let admin = require('firebase-admin')
admin.app()

let serviceHasTeam = require('./service_HasTeam')
let serviceGetTeamProfile = require('./service_TeamsProfile')
module.exports = {
    getInviterInfo: (userId) =>{
        return getInviterInfo(userId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function getInviterInfo(userId){
    try{
        return new Promise((resolve, reject)=>{
            let listInvites = []
            firebaseRef.child('Invitation').child(userId)
            .once('value',(snap)=>{
                let len = snap.numChildren()
                let count = 0
                snap.forEach( childSnap => {
                    let inviterId = childSnap.val().leader
                    let promiseGetInviterName = admin.auth().getUser(inviterId)
                    let promiseGetInviterTeamId = serviceHasTeam.hasTeam(inviterId)
                    let promiseGetTeamsName = serviceGetTeamProfile.getTeamsProfile(inviterId)

                    Promise.all([promiseGetInviterName, promiseGetInviterTeamId, promiseGetTeamsName])
                    .then((values)=>{
                            listInvites.push({
                                teamsName: values[2].val().teamsName,
                                invitersName: values[0].displayName,
                                invitersEmail: values[0].email,
                                invitersPhotoURL: values[0].photoURL,
                                teamId: values[1],
                                checked: childSnap.val().checked
                            })
                            count++
                            if(len == count){
                                resolve(listInvites)
                            }
                        },
                        (reason)=>{
                            reject(reason)
                        })
                })
               
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