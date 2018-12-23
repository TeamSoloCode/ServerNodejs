let firebase = require('firebase')
firebase.app()

module.exports = {
    isLeader: (teamId, userId) =>{
        return isLeader(teamId, userId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function isLeader(teamId, userId){
    try{
        return new Promise((resolve, reject)=>{
            //kiểm tra người mời có phải là leader của team hay không
            firebaseRef.child('Leader').child(teamId)
            .once('value',(snap)=>{
                if(snap.val() == null || typeof snap.val() == 'undefined'){
                    resolve(false)
                }
                else{
                    const leaderId = snap.val().leader
                    if(leaderId == userId){
                        resolve(snap.val().leader)
                    }else{
                        resolve(false)
                    }
                }
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