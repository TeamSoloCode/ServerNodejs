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
        let rateTimes = 0;
        db.collection('Rating').doc(locationId).get()
        .then(docSnapshot =>{
            let ratingList = Object.values(docSnapshot.data())
            let totalStars = 0
            rateTimes = ratingList.length
            for(star of ratingList){
                totalStars += Number(star)
            }   
            //sync to TouristLocation
            db.collection('TouristLocation').doc(locationId)
            .set({
                rateTimes: rateTimes, //update rateTimes
                stars: totalStars/rateTimes //update star
            }, { merge: true })
            .then(()=>{
                console.log("Sync rate success")
            })
            .catch((reason)=>{
                console.log(reason)
            })
        })
        .catch(err =>{
            console.log(err)
        })

        // let ratingPromise = new Promise((resolve, reject)=>{
        //     ref.child(`Rating/${locationId}`).on('value',(snap)=>{
        //         let totalStars = 0;
        //         Object.values(snap.val()).forEach(element => {
        //             totalStars += Number(element)
        //         });
        //         avgStars = totalStars/snap.numChildren()
        //         rateTimes = snap.numChildren()
        //         //console.log(avgStars)
        //         resolve()
        //         reject()
        //     })
        // })
    
        // ratingPromise.then(()=>{
        //     //turn off listener when have all data
        //     ref.child(`Rating/${locationId}`).off()
        //     //update sao bên TouristLocation
        //     let updateRating = {}
        //     updateRating[`TouristLocation/${locationId}/stars`] = avgStars
        //     //update lần đánh giá bên Tourist Location
        //     let updateRateTimes = {}
        //     updateRateTimes[`TouristLocation/${locationId}/rateTimes`] = rateTimes
        //     //updating
        //     ref.update([updateRating,updateRateTimes])
        // })
        // .catch(()=>{
        //     //console.log('á đù')
        // })
    }
    catch(err){
        throw err
    }
}

