const firebaseRealtime = require('firebase');
firebaseRealtime.app()

let Constant = require('../../constant')
/**
 * Export
 */
module.exports = {
    syncRatingStart: (locationId, userId, stars) =>{
        return syncRatingStart(locationId, userId, stars)
    }
}

function syncRatingStart(){
    
}