const firebaseRealtime = require('firebase');
firebaseRealtime.app()
/**
 * Export
 */
let output = {
    getAllTouristLocation: ()=>{
        return getAllTouristLocation() 
    },
    getTouristLocationById: (id) =>{
        return getById(id)
    }
}
module.exports = output

//get firebase reference
let ref = firebaseRealtime.database().ref();
/**
 * 
 */
function getAllTouristLocation(){
    return new Promise((resolve, reject)=>{
        let listData = []
        ref.child('test').once('value')
        .then(function(snap){
            resolve(Object.values(snap.val()))
            //console.log(Object.entries(snap.val())) //get type [key, value]
        })
        .catch((reason)=>{
            reject(reason)
        });
    })
}
/**
 * get tourist location by Id
 * @param {*} id 
 */
function getById(id){
    return new Promise((resolve, reject)=>{
        let result
        ref.child(`test/${id}`).once('value')
        .then((snap)=>{
            //set id be the key of the snapshot
            let object = {}
            object[id] = snap
            resolve(object)
        })
        .catch((reason)=>{
            reject(reason)
        })
    })
}


