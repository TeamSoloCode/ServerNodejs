

let response = function response(resultCode, data){
    if(resultCode != 1)
        return {resultCode: resultCode, resultMessage: data}
    return {resultCode: resultCode, resultData: data}
}
module.exports = response