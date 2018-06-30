let firebase = require('firebase')
firebase.app()

let admin = require('firebase-admin')
admin.app()

module.exports = {
    getAllMember: (userId, teamId) => {
        return getAllMember(userId, teamId)
    }
}
//database realtime reference
let firebaseRef = firebase.database().ref()

function getAllMember(userId, teamId){
    try{
        return new Promise((resolve, reject)=>{
            firebaseRef.child(`HasTeam/${userId}`).once('value')
            .then((snapHasTeam)=>{
                if(snapHasTeam.val() == teamId){
                    let memberList = []
                    let counter = 0
                    firebaseRef.child(`Team/${teamId}`).once('value')
                    .then((snapTeam)=>{
                        let memberCounter = snapTeam.numChildren()
                        snapTeam.forEach( snapChild =>{
                            admin.auth().getUser(snapChild.key)
                            .then(memberInfor =>{
                                let member = {
                                    id: snapChild.key,
                                    name: memberInfor.displayName,
                                    phone: memberInfor.phoneNumber,
                                    image: memberInfor.photoURL,
                                    email: memberInfor.email
                                }
                                memberList.push(member)
                                counter++
                                if(counter == memberCounter){
                                    resolve(memberList)
                                }
                            })
                        })
                    })
                    .catch((reason)=>{
                        reject(reason)
                    })
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