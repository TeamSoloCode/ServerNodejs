const firebaseDB = require('firebase')
firebaseDB.app()


let admin = require('firebase-admin')
admin.app()

module.exports = {
    ping: (userId, teamId, pingCode)=>{
        return ping(userId, teamId, pingCode)
    }
}

let realtimeDB = firebaseDB.database().ref()
function ping(userId, teamId, pingCode){
    try{
        return new Promise((resolve, reject)=>{
            let now = new Date().getTime()
            let id = realtimeDB.child(`Ping/${teamId}`).push().key
            realtimeDB.child(`CheckingPing/${teamId}/${userId}`).once('value',(snap)=>{
                if(snap.val() != null || typeof snap.val() != 'undefined'){
                    if(snap.val() < now - 300000){
                        admin.auth().getUser(userId)
                        .then((userRecord)=>{
                            let promiseCheckPing = realtimeDB.child(`CheckingPing/${teamId}/${userId}`).set(now)
                            let promisePing = realtimeDB.child(`Ping/${teamId}/${id}`).set({
                                userName: userRecord.displayName,
                                userId: userId,
                                pingCode: pingCode,
                                addedTime: now
                            })

                            Promise.all([promiseCheckPing, promisePing])
                            .then(()=>{
                                resolve(1)
                            })
                            .catch((reason)=>{
                                reject(reason)
                            })
                        })
                        .catch(reason =>{
                            reject(reason)
                        })
                    }
                    else{
                        resolve(-1)
                    }
                }
                else{
                    admin.auth().getUser(userId)
                    .then((userRecord)=>{
                        let promiseCheckPing = realtimeDB.child(`CheckingPing/${teamId}/${userId}`).set(now)
                        let promisePing = realtimeDB.child(`Ping/${teamId}/${id}`).set({
                                userName: userRecord.displayName,
                                userId: userId,
                                pingCode: pingCode,
                                addedTime: now
                        })

                        Promise.all([promiseCheckPing, promisePing])
                        .then(()=>{
                            resolve(1)
                        })
                        .catch((reason)=>{
                            reject(reason)
                        })
                    })
                    .catch(reason =>{
                        reject(reason)
                    })
                }
            })
        })
    }
    catch(err){
        throw err
    }
}
