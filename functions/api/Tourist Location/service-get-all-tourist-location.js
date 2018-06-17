const admin = require('firebase-admin')
admin.app()
let db = admin.firestore()

let Constant = require('../../constant')
let responseType = require('../../responseType')
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

/**
 * Get all tourist location
 */
function getAllTouristLocation(){
    return new Promise((resolve, reject)=>{
        db.collection('TouristLocation').get()
        .then((snapshot) => {
            let listData = []
            snapshot.forEach((doc) => {
                let obj = doc.data()
                obj.id  = doc.id
                listData.push(obj)
            });
            resolve(listData)
        })
        .catch((reason) => {
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
            db.collection('TouristLocation').where('deleteFlag','==',0).get()
            .then(function(snapshot){
                let listData = []
                snapshot.forEach((doc) => {
                    let obj = doc.data()
                    obj.id  = doc.id
                    listData.push(obj)
                });
                resolve(listData)
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
        db.collection('TouristLocation').doc(id).get()
        .then(function(snapshot){
            resolve(snapshot.data())
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
        db.collection('TouristLocationDetail').doc(id).get()
        .then(function(snapshot){
            resolve(snapshot.data().detail)
        })
        .catch((reason)=>{
            reject(reason)
        })
    })
}