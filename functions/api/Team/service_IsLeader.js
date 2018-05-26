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
                let leaderId = snap.val()
                if(leaderId == null || typeof leaderId == 'undefined'){
                    resolve(false)
                }
                else{
                    if(leaderId.leader === userId){
                        resolve(leaderId)
                    }
                    else{
                        resolve(false)
                    }
                }
               
            })
            .catch((reason)=>{
                reject(false)
            });
        })
    }
    catch(err){
        throw err
    }
}