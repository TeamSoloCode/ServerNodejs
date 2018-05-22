let firebase = require('firebase')
firebase.app()

let isLeader = require('./service_IsLeader')
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
                    resolve1(1)
                })
                .catch((reason)=>{
                    console.log(reason.toString())
                    reject1(0)
                });
            })

            let syncJoinTeam = new Promise((resolve1, reject1)=>{
                let userLocation = {};            
                userLocation[`Team/${teamId}/${userId}`] = {
                    log: 'offline',
                    lat: 'offline'
                }
                //sync set user join team
                firebaseRef.update(userLocation)
                .then(()=>{
                    resolve1(1)
                })
                .catch((reason)=>{
                    console.log(reason.toString())
                    reject1(0)
                });
            })

            //run all sync object
            Promise.all([syncHasTeam, syncJoinTeam]).then(
                (values)=>{
                    resolve()
                },
                (reason)=>{
                    console.log(reason.toString())
                    reject(0)
                }
            )
        })
    }
    catch(err){
        throw err
    }
}

function syncDeleteTeam(leaderId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            isLeader.isLeader(teamId, leaderId)
            .then((result)=>{
                if(result == true){
                    let deleteFromLeader = firebaseRef.child(`Leader/${teamId}`).remove()
                    let deleteHasTeam = new Promise((resolve, reject)=>{
                        firebaseRef.child(`Team/${teamId}`).once('value')
                        .then((snap)=>{

                        })
                        .catch((reason)=>{
                            
                        })
                    })
                }
                else{

                }
            })
            .catch(()=>{
                return 0
            })
        })
    }
    catch(err){
        throw err
    }
}
