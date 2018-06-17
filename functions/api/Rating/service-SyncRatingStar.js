const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

/**
 * Export
 */
module.exports = {
    syncRatingStar: (locationId) =>{
        return syncRatingStar(locationId)
    }
}

/**
 * Đồng bộ hóa đánh giá sao giữa nhánh Rating và nhánh TouristLocation
 * @param {*} locationId 
 */
function syncRatingStar(locationId){
    try{

        db.collection('Rating').doc(locationId).get()
        .then(docSnapshot =>{
            let rateTimes = 0;
            let totalStars = 0
            //firebase ko su dung dc Object.values()
            for(let key in docSnapshot.data()) {
                let value = docSnapshot.data()[key];
                totalStars += Number(value)
                rateTimes += 1
            }
            //sync to TouristLocation
            db.collection('TouristLocation').doc(locationId)
            .set({
                rateTimes: rateTimes, //update rateTimes
                stars: totalStars/rateTimes //update star
            }, { merge: true })
        })
        .catch(err =>{
            console.log(err)
        })
    }
    catch(err){
        throw err
    }
}

