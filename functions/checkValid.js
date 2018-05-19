
module.exports = {
    checkEmptyOrNull: (value) =>{
        return checkEmptyOrNull(value)
    },
    checkValidNumber: (value) =>{
        return checkValidNumber(value)
    }
}
/**
 * Kiểm tra lỗi empty or null
 * @param {*} value 
 */
function checkEmptyOrNull(value){
    if(value == "" || value == null)
        return false
    return true
}

/**
 * Kiểm ra ko parse qua dc kiểu số
 * @param {*} value 
 */
function checkValidNumber(value){
    if(typeof value !== 'number')
        return false
    return true
}