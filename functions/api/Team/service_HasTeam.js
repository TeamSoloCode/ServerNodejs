let firebase = require('firebase')
firebase.app()

module.exports = {
    hasTeam: (userId) =>{
        return hasTeam(userId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function hasTeam(userId){
    try{
        return new Promise((resolve, reject)=>{
            //check has team
            firebaseRef.child('HasTeam').child(userId)
            .once('value',(snap)=>{
                let check = snap.val()
                if(typeof check == 'undefined' || check == null){
                    resolve(false)
                }
                else{
                    resolve(check)
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