const utils = require("./utils");
const token =""
function ji(){
    utils.authenticatedUserId({headers : {authorization : `Bearer ${token}`}})
    .then(data => console.log(data))
    .catch(err => console.error(err))
}

ji()