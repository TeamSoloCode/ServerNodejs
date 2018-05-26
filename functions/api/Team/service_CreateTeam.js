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
            hasTeam.hasTeam(userId).then((result)=>{
                if(result == false){
                    // Get a key for a new Team.
                    let newTeamKey = firebaseRef.push().key;
                    let createTeam = {};
                    createTeam['/Leader/' + newTeamKey] = {
                        leader: userId
                    };

                    //create new team reference
                    firebaseRef.update(createTeam)
                    .then(()=>{
                        syncTeamModule.syncCreateTeam(userId, newTeamKey)
                        .then(()=>{
                            resolve(1)
                        })
                        .catch((reason)=>{
                            reject(reason)
                        })
                    })
                    .catch((reason)=>{
                        reject(reason)
                    });
                }
                else{
                    resolve(0)
                }
            })
        })
    }
    catch(err){
        throw err
    }
}