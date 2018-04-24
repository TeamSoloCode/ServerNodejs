const firebaseRealtime = require('firebase');
firebaseRealtime.app()

let Constant = require('../../constant')
let TouristLocation = require('../../models/tourist-location')
let TouristLocationDetail = require('../../models/tourist-location-detail')
/**
 * Export
 */
let output = {
    addTouristLocation: () => {
        return addTouristLocation()
    },
    addTouristLocationDetail: (adminId,touristLocationId, data) => {
        return addTouristLocationDetail(adminId,touristLocationId, data)
    }
}
module.exports = output

let ref = firebaseRealtime.database().ref();
function addTouristLocation() {
    return new Promise((resolve, reject) => {
        let date = new Date()
        let touristLocation = new TouristLocation();
        touristLocation.addedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}<br/>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}s`
        touristLocation.basicInfo = randomChar()
        touristLocation.image = 'url'
        touristLocation.kindId = 1
        touristLocation.lat = Math.random()
        touristLocation.log = Math.random()
        touristLocation.name = randomChar()
        touristLocation.rateTimes = Math.floor(Math.random() * 500)
        touristLocation.stars = Math.floor((Math.random() * 5) + 1)
        touristLocation.updatedDate = ""
        touristLocation.deleteFlag = 0

        let newPostKey = ref.child('/TouristLocation').push().key;
        let updates = {};
        updates['/TouristLocation/' + newPostKey] = touristLocation;

        
        ref.update(updates).then(() => {
            resolve(Constant.ADD_TOURIST_LOCATION_SUCCESS)
        })
        .catch((reason) => {
            reject(reason)
        });
    })
}

/**
 * Add new detail for tourist location
 * @param {*} adminId 
 * @param {*} touristLocationId 
 * @param {*} data 
 */
function addTouristLocationDetail(adminId,touristLocationId, data){
    return new Promise((resolve, reject)=>{
        try{
            let touristLocationDetail = new TouristLocationDetail();
            let listDetail = JSON.parse(data)
            let postData = []
            for(let num in listDetail){
                let obj = {}
                obj[num] = listDetail[num]
                postData.push(obj)
            }
            let updates = {}
            updates['/TouristLocationDetail/' + touristLocationId] = postData;
    
            ref.update(updates).then(() => {
                resolve(Constant.ADD_TOURIST_LOCATION_DETAIL_SUCCESS)
            })
            .catch((reason) => {
                reject(reason)
            });
        }
        catch(err){
            throw err
        }
    })
}

function randomChar() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}