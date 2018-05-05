const firebaseRealtime = require('firebase')
firebaseRealtime.app()

let Constant = require('../../constant')
let serviceGet = require('./service-get-all-tourist-location')
/**
 * Export
 */
let output = {
    editTouristLocation: (adminId, touristLocationId) => {
        return editTouristLocation(adminId, touristLocationId)
    },
    editTouristLocationDetail:(id, data) => {
        return editDetail(id, data)
    }
}
module.exports = output

let ref = firebaseRealtime.database().ref();

/**
 * edit tourist location
 * @param {*} adminId 
 * @param {*} touristLocationId 
 */
function editTouristLocation(adminId, touristLocationId, updateObject) {
    return new Promise((resolve, reject) => {
        serviceGet.getTouristLocationById(touristLocationId)
            .then((result) => {
                let data = JSON.parse(JSON.stringify(result))
                let touristLocation = data[touristLocationId]

                let date = new Date()
                touristLocation.basicInfo = updateObject.basicInfo
                touristLocation.image = updateObject.image
                touristLocation.kindId = updateObject.image
                touristLocation.lat = updateObject.image
                touristLocation.log = updateObject.image
                touristLocation.name = updateObject.image
                touristLocation.updatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}<br/>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}s`

                //updating
                let updates = {};
                updates['TouristLocation/' + touristLocationId] = touristLocation;
                ref.update(updates).then(() => {
                    resolve(Constant.success.EDIT_TOURIST_LOCATION)
                })
                .catch((reason) => {
                    reject(reason)
                });
            })
            .catch((reason) => {
                reject(reason)
            })
    })
}

/**
 * Edit tourist location detail
 * @param {*} id 
 * @param {*} data 
 */
function editDetail(id, data){
    try{
        return new Promise((resolve, reject)=>{
            //let touristLocationDetail = new TouristLocationDetail();
            let listDetail = JSON.parse(data)
            let postData = []
            for(let num in listDetail){
                let obj = {}
                obj[num] = listDetail[num]
                postData.push(obj)
            }
            let updates = {}
            updates['/TouristLocationDetail/' + id] = postData;

            ref.update(updates).then(() => {
                resolve(Constant.success.EDIT_TOURIST_LOCATION_DETAIL)
            })
            .catch((reason) => {
                reject(reason)
            });
        })
    }
    catch(err){
        throw err
    }
}