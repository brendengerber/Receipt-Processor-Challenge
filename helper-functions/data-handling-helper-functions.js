//Imports necessary modules
const crypto = require('crypto')

const assignEntryId = function(data){
    let id;
    let unique = false;
    //Continues generating UUIDv4s until a unique one is generated
    while(!unique){
        id = crypto.randomUUID();
        unique = !data.hasOwnProperty(id);
    }
    //Reserves the UUIDv4 so it cannot be taken by another request coming in before processing has been completed
    data.id = undefined;
    //Returns the UUIDv4 for use in consequent functions and middleware
    return id;
};

module.exports = {
    assignEntryId
};













