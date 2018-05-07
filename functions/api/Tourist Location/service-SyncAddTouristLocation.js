const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

/**
 * Export
 */
module.exports = {
    syncAddTouristLocation_Comment: (locationId) =>{
        return syncAddTouristLocation_Comment(locationId)
    },
    syncAddTouristLocation_Rating: (locationId) =>{
        return syncAddTouristLocation_Rating(locationId)
    }
}

/**
 * Đồng bộ tạo mới collection bên Comment
 * @param {*} locationId 
 */
function syncAddTouristLocation_Comment(locationId){
    try{
        db.collection('Comment').doc(locationId).set({})
        .then(ok =>{
            
        })
        .catch(err =>{
            console.log(err)
        })
    }
    catch(err){
        throw err
    }
}

/**
 * Đồng bộ tạo mới collection bên Rating
 * @param {*} locationId 
 */
function syncAddTouristLocation_Rating(locationId){
    try{
        db.collection('Rating').doc(locationId).set({})
        .then(ok =>{
            
        })
        .catch(err =>{
            console.log(err)
        })
    }
    catch(err){
        throw err
    }
}