const firebaseRealtime = require('firebase');
firebaseRealtime.app()

/**
 * Export
 */
module.exports = {
    syncRatingStar: (locationId) =>{
        return syncRatingStar(locationId)
    }
}

let ref = firebaseRealtime.database().ref()
/**
 * Đồng bộ hóa đánh giá sao giữa nhánh Rating và nhánh TouristLocation
 * @param {*} locationId 
 */
function syncRatingStar(locationId){
    try{
        let avgStars = 0;
        let rateTimes = 0;
        let ratingPromise = new Promise((resolve, reject)=>{
            ref.child(`Rating/${locationId}`).on('value',(snap)=>{
                let totalStars = 0;
                Object.values(snap.val()).forEach(element => {
                    totalStars += Number(element)
                });
                avgStars = totalStars/snap.numChildren()
                rateTimes = snap.numChildren()
                //console.log(avgStars)
                resolve()
                reject()
            })
        })
    
        ratingPromise.then(()=>{
            //turn off listener when have all data
            ref.child(`Rating/${locationId}`).off()
            //update sao bên TouristLocation
            let updateRating = {}
            updateRating[`TouristLocation/${locationId}/stars`] = avgStars
            ref.update(updateRating)
            //update lần đánh giá bên Tourist Location
            let updateRateTimes = {}
            updateRateTimes[`TouristLocation/${locationId}/rateTimes`] = rateTimes
            ref.update(updateRateTimes)
        })
        .catch(()=>{
            //console.log('á đù')
        })
    }
    catch(err){
        throw err
    }

}