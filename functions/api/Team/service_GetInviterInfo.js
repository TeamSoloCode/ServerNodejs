const firebase = require('firebase')
firebase.app()

const admin = require('firebase-admin')
admin.app()

const serviceHasTeam = require('./service_HasTeam')
const serviceGetTeamProfile = require('./service_TeamsProfile')
const serviceGetUserByEmail =  require('./service_GetUserByEmail')

module.exports = {
    getInviterInfo: (userEmail) =>{
        return getInviterInfo(userEmail)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function getInviterInfo(userEmail){
    try{
        return new Promise((resolve, reject)=>{
            let listInvites = []
            let promiseList = []
            serviceGetUserByEmail.getUserByEmail(userEmail)
            .then((userId)=>{
                return firebaseRef.child('Invitation').child(userId).once('value')
            })
            .then((snap) => {
                snap.forEach( childSnap => {
                    const inviterId = childSnap.val().leader
                    const promiseGetInviterName = admin.auth().getUser(inviterId)
                    const promiseGetInviterTeamId = serviceHasTeam.hasTeam(inviterId)
                    const promiseGetTeamsName = serviceGetTeamProfile.getTeamsProfile(inviterId)

                    promiseList.push(Promise.all([  promiseGetInviterName,
                                                    promiseGetInviterTeamId,
                                                    promiseGetTeamsName,
                                                    {checked: childSnap.val().checked}])                                                    )
                })
                return Promise.all(promiseList)
            })
            .then((results)=>{
                results.forEach( result => {
                    listInvites.push({
                        teamsName: result[2].val().teamsName,
                        invitersName: result[0].displayName,
                        invitersEmail: result[0].email,
                        invitersPhotoURL: result[0].photoURL,
                        teamId: result[1],
                        checked: result[3].checked
                    })
                })

                resolve(listInvites)
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