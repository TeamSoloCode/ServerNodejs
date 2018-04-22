const firebaseRealtime = require('firebase');
firebaseRealtime.app()

let TouristLocation = require('../../models/tourist-location')
/**
 * Export
 */
let output = {
    addTouristLocation: () => {
        return addTouristLocation()
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

        let newPostKey = ref.child('/test').push().key;
        let updates = {};
        updates['/test/' + newPostKey] = touristLocation;

        
        ref.update(updates).then(() => {
            let object = {}
            object[id] = snap
            resolve(object)
        })
        .catch((reason) => {
            reject(reason)
        });
    })
}

function randomChar() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// function deleteItem(id) {
//     dbRef.child(id).remove()
// }