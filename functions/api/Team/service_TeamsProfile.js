let firebase = require('firebase')
firebase.app()

module.exports = {
    getTeamsProfile: (leaderId) =>{
        return getTeamsProfile(leaderId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function getTeamsProfile(leaderId){
    try{
        return new Promise((resolve, reject)=>{
            //check has team
            firebaseRef.child('TeamProfile').orderByChild("leader").equalTo(leaderId)
            .once('value',(snap)=>{
               snap.forEach(childSnap =>{
                   resolve(childSnap)
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