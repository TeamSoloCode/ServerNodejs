let admin = require('firebase-admin')
admin.app()

module.exports = {
    updateUserProfile: (userId) =>{
       return updateUserProfile(userId)
    }
}

function updateUserProfile(userId, displayName){
    try{
        return new Promise((resolve, reject)=>{

            admin.auth().updateUser(userId,{
                displayName: displayName,
                photoURL: "https://scontent.fsgn5-1.fna.fbcdn.net/v/t31.0-1/c379.0.1290.1290/10506738_10150004552801856_220367501106153455_o.jpg?oh=31f7ca1c6afb7b2ff08b0a73fd383def&oe=5ACE2A7C",
            })
            .then(function(userRecord) {
                if(userRecord.uid == userId){
                    resolve(0)
                }
                else{
                    resolve(userRecord.uid)
                } 
            })
            .catch(function(error) {
                reject(error.toString())
            });
        })
    }
    catch(err){
        throw err
    }
}
