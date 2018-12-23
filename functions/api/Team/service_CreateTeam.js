let firebase = require('firebase')
firebase.app()

const syncTeamModule = require('./service_SyncTeamModule')
const hasTeam = require('./service_HasTeam')
const getUserId = require('./service_GetUserByEmail')

module.exports = {
    createTeam: (userEmail, teamsName) =>{
        return createTeam(userEmail, teamsName)
    }
}
//database realtime reference
const firebaseRef = firebase.database().ref()

function createTeam(userEmail, teamsName){
    try{
        let userId = null
        // Get a key for new Team.
        const newTeamKey = firebaseRef.push().key;

        return new Promise((resolve, reject) => {
            //get userId by email
            getUserId.getUserByEmail(userEmail)
            .then((Id)=>{
                userId = Id
                //kiểm tra user có đội hay chưa
                return hasTeam.hasTeam(userId)
            })
            .then((result)=>{
                if(result == false){
                    let createTeam = {};
                    createTeam['/Leader/' + newTeamKey] = {
                        leader: userId
                    };
                    //create new team reference
                    return firebaseRef.update(createTeam)
                }
                else{
                    return 0
                }
            })
            .then((result)=>{
                //nếu chưa có team thì chạy syncCreateTeam
                if (result != 0){
                    return syncTeamModule.syncCreateTeam(userId, newTeamKey, teamsName)
                }
                return 0
            })
            .then((result)=>{
                if(result == 0 ){
                    resolve(0)
                }
                resolve(1)
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