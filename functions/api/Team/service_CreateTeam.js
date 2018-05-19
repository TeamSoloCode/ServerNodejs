let firebase = require('firebase')
firebase.app()

let syncTeamModule = require('./service_SyncTeamModule')
let hasTeam = require('./service_HasTeam')

module.exports = {
    createTeam: (userId) =>{
        return createTeam(userId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function createTeam(userId){
    try{
        return new Promise((resolve, reject) => {
            //kiểm tra user có đội hay chưa
            if(hasTeam.hasTeam(userId) == false){
                // Get a key for a new Team.
                var newTeamKey = firebaseRef.push().key;
                let createTeam = {};
                createTeam['/Team/' + newTeamKey] = {
                    leader: userId
                };

                //create new team reference
                firebaseRef.update(createTeam)
                .then(()=>{
                    resolve()
                })
                .catch((reason)=>{
                    reject(reason)
                });
            }
            else{
                reject()
            }
        })
    }
    catch(err){
        throw err
    }
}