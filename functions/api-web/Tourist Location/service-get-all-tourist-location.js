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
        ref.child('TouristLocation').once('value')
        .then(function(snap){
            let data = Object.values(snap.val())
            let len = Object.values(snap.val()).length;
            let result = []
            for(let i = 0; i < len; i++){
                if(data[i].DeleteFlag != 1){
                    result.push(data[1])
                }
            }
            resolve(result)
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


