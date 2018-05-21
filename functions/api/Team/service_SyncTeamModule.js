let firebase = require('firebase')
firebase.app()

module.exports = {
    syncCreateTeam: (userId, teamId) =>{
        return syncCreateTeam(userId, teamId)
    },
    syncJoinTeam: (userId, teamId) =>{
        return syncJoinTeam(userId, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function syncCreateTeam(userId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            let syncHasTeam = new Promise((resolve1, reject1)=>{
                let hasTeam = {};
                hasTeam['/HasTeam/' + userId] = teamId
                //sync set user has team
                firebaseRef.update(hasTeam)
                .then(()=>{
                    resolve1()
                })
                .catch((reason)=>{
                    reject1(reason)
                });
            })

            let syncCreateTeam = new Promise((resolve1, reject1)=>{
                let userLocation = {};
                userLocation[`Team/${teamId}/${userId}`] = {
                    log: 'offline',
                    lat: 'offline'
                }

                firebase.database().ref(`Team/${teamId}`).set({
                    leader: userId
                });
                //sync set user has team
                firebaseRef.update(userLocation)
                .then(()=>{
                    resolve1()
                })
                .catch((reason)=>{
                    console.log(reason.toString())
                    reject1(reason)
                });
            })

            let syncTeamLeader = new Promise((resolve1, reject1)=>{
                //the team creater is the leader of the team
                firebase.database().ref(`Team/${teamId}`).set({
                    leader: userId
                })
                .then(()=>{
                    resolve1()
                })
                .catch((reason)=>{
                    console.log(reason.toString())
                    reject1(reason)
                })
            })
            //run all sync object
            Promise.all([syncHasTeam, syncCreateTeam,syncTeamLeader]).then(
                ()=>{
                    resolve()
                },
                (reason)=>{
                    reject(reason)
                }
            )
        })
    }
    catch(err){
        throw err
    }
}

function syncJoinTeam(userId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            let syncHasTeam = new Promise((resolve1, reject1)=>{
                let hasTeam = {};
                hasTeam['/HasTeam/' + userId] = teamId
                //sync set user has team
                firebaseRef.update(hasTeam)
                .then(()=>{
                    resolve1()
                })
                .catch((reason)=>{
                    reject1(reason)
                });
            })

            let syncJoinTeam = new Promise((resolve2, reject2)=>{
                let userLocation = {};            
                userLocation[`Team/${teamId}/${userId}`] = {
                    log: 'offline',
                    lat: 'offline'
                }
                //sync set user join team
                firebaseRef.update([userLocation,])
                .then(()=>{
                    resolve2()
                })
                .catch((reason)=>{
                    reject2(reason)
                });
            })

            //run all sync object
            Promise.all([syncHasTeam, syncJoinTeam]).then(
                ()=>{
                    resolve()
                },
                (reason)=>{
                    reject(reason)
                }
            )
        })
    }
    catch(err){
        throw err
    }
}
