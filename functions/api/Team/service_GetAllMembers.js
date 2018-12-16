let firebase = require('firebase')
firebase.app()

const admin = require('firebase-admin')
admin.app()

const getUserId = require('./service_GetUserByEmail')

module.exports = {
    getAllMember: (userEmail, teamId) => {
        return getAllMember(userEmail, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function getAllMember(userEmail, teamId){
    try{
        let memberList = []
        let promisesList = []

        return new Promise((resolve, reject)=>{
            getUserId.getUserByEmail(userEmail)
            .then((userId)=> {
                return firebaseRef.child(`HasTeam/${userId}`).once('value')
            })
            .then((snapHasTeam)=>{
                if(snapHasTeam.val() == teamId){
                    return firebaseRef.child(`Team/${teamId}`).once('value')
                }
                else{
                    resolve(-1)
                }
            })
            .then((snapTeam)=>{
                snapTeam.forEach( snapChild =>{
                    const promise = admin.auth().getUser(snapChild.key)
                    promisesList.push(promise)
                })

                return Promise.all(promisesList)
            })
            .then((memberInforList)=>{
                memberInforList.map((memberInfor)=>{
                    let member = {
                        id: snapChild.key,
                        name: memberInfor.displayName,
                        phone: memberInfor.phoneNumber,
                        image: memberInfor.photoURL,
                        email: memberInfor.email
                    }
                    memberList.push(member)
                })

                resolve(memberList)
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