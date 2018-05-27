let firebase = require('firebase')
firebase.app()

module.exports = {
    getAllMember: (userId, teamId) => {
        return getAllMember(userId, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function getAllMember(userId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            firebaseRef.child(`HasTeam/${userId}`).once('value')
            .then((snapHasTeam)=>{
                if(snapHasTeam.val() == teamId){
                    firebaseRef.child(`Team/${teamId}`).once('value')
                    .then((snapTeam)=>{
                        resolve(snapTeam.val())
                    })
                    .catch((reason)=>{
                        reject(reason)
                    })
                }
                else{
                    resolve(-1)
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