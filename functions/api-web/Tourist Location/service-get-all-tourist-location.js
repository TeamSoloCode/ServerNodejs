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
    },
    getTouristLocationDetailById: (id) =>{
        return getDetailById(id)
    },
    getAllTouristLocationNotBeDeleted: () =>{
        return getAllTouristLocationNotBeDeleted()
    }
}
module.exports = output

//get firebase reference
let ref = firebaseRealtime.database().ref();
/**
 * Get all tourist location
 */
function getAllTouristLocation(){
    return new Promise((resolve, reject)=>{
        let listData = []
        ref.child('TouristLocation').once('value')
        .then(function(snap){
            resolve(snap)
            //console.log(Object.entries(snap.val())) //get type [key, value]
        })
        .catch((reason)=>{
            reject(reason)
        });
    })
}
/**
 * Get all tourist location not be deleted
 */
function getAllTouristLocationNotBeDeleted(){
    try{
        return new Promise((resolve, reject)=>{
            ref.child('TouristLocation').orderByChild("deleteFlag").equalTo(0).once('value')
            .then(function(snap){
                resolve(snap)
            })
            .catch((reason)=>{
                reject(reason)
            });
        })
    }
    catch(err){
        throw err
    }
}

/**
 * get tourist location by Id
 * @param {*} id 
 */
function getById(id){
    return new Promise((resolve, reject)=>{
        let result
        ref.child(`TouristLocation/${id}`).once('value')
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
/**
 * Get tourist location by id
 * @param {*} id 
 */
function getDetailById(id){
    return new Promise((resolve, reject)=>{
        let result
        ref.child(`TouristLocationDetail/${id}`).once('value')
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


