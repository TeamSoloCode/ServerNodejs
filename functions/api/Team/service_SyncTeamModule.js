let firebase = require('firebase')
firebase.app()

let isLeader = require('./service_IsLeader')
module.exports = {
    syncCreateTeam: (userId, teamId) =>{
        return syncCreateTeam(userId, teamId)
    },
    syncJoinTeam: (userId, teamId) =>{
        return syncJoinTeam(userId, teamId)
    },
    syncDeleteTeam: (userId, teamId) =>{
        return syncDeleteTeam(userId, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function syncCreateTeam(userId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            let newProfileKey = firebaseRef.push().key;
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
                    reject1(reason)
                });
            })

            let syncTeamLeader = new Promise((resolve1, reject1)=>{
                //the team creater is the leader of the team
                firebase.database().ref(`Team/${teamId}`).set({
                    leader: userId,
                    profileId: newProfileKey
                })
                .then(()=>{
                    resolve1()
                })
                .catch((reason)=>{
                    reject1(reason)
                })
            })

            let syncTeamProfile = new Promise((resolve1, reject1)=>{
                //create teams profile
                firebase.database().ref(`TeamProfile/${newProfileKey}`).set({
                    createdDate: firebase.database.ServerValue.TIMESTAMP,
                    createdBy: userId,
                    member: 1
                })
                .then(()=>{
                    resolve1()
                })
                .catch((reason)=>{
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
/**
 * 
 * @param {*} userId 
 * @param {*} teamId 
 */
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
                    reject1(reason)
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
                    reject1(reason)
                });
            })

            //run all sync object
            Promise.all([syncHasTeam, syncJoinTeam]).then(
                (values)=>{
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

//TODO: Phải biết cái nào delete trk sau nếu ko thành công phải rollback
/**
 * Delete team from leader
 * @param {*} leaderId 
 * @param {*} teamId 
 */
function syncDeleteTeam(leaderId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            //leader checker
            isLeader.isLeader(teamId, leaderId)
            .then((result)=>{
                if(result != false){
                    //promise delete leaderId in 'HasTeam'
                    let deleteLeaderFormHasTeam = firebaseRef.child(`HasTeam/${leaderId}`).remove()
                    //promise delete from Leader
                    let deleteFromLeader = firebaseRef.child(`Leader/${teamId}`).remove()
                    //promise delete from Team
                    let deleteHasTeam = new Promise((resolve1, reject1)=>{
                        firebaseRef.child(`Team/${teamId}`).once('value')
                        .then((snap)=>{
                            let listMember = []
                            Object.keys(snap.val()).forEach((key)=>{
                                let member = {}
                                //delete by set null
                                member[key] = null
                                listMember.push(member)
                            })
                            //promise delete from HasTeam
                            firebaseRef.child(`HasTeam`).set(listMember)
                            .then(()=>{
                                firebaseRef.child(`Team/${teamId}`).remove()
                                .then(()=>{
                                    resolve1()
                                })
                                .catch((reason)=>{
                                    reject1(reason)
                                })
                            })
                            .catch((reason)=>{
                                reject1(reason)
                            })
                        })
                        .catch((reason)=>{
                            reject1(reason)
                        })
                    })

                     //run all sync object
                    Promise.all([deleteFromLeader, deleteHasTeam, deleteLeaderFormHasTeam]).then(
                        (values)=>{
                            resolve(1)
                        },
                        (reason)=>{
                            reject(reason)
                        }
                    )
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
