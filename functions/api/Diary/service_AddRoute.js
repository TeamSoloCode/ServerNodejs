const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

module.exports = {
    addRoute: (userId, diaryId, routes)=>{
        return addRoute(userId, diaryId, routes)
    }
}

function addRoute(userId, diaryId, routes){
    try{
        return new Promise((resolve, reject)=>{
            //[{1:{log:1, lat:2}}, {2:{log:2, lat:3}}]
            let routeObj = JSON.parse(routes)
            db.collection('Diary').doc(userId).collection('Route').doc(diaryId).set(routes)
            .then(()=>{
               resolve()
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