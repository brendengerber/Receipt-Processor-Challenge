//Imports necessary modules
const crypto = require('crypto')

//Assigns a v4 UUID to an entry for any data object
const assignEntryId = function(data){
    let id;
    let unique = false;
    //Continues generating v4 UUIDs until a unique one is generated
    while(!unique){
        id = crypto.randomUUID();
        unique = !data.hasOwnProperty(id);
    }
    //Reserves the v4 UUID so it cannot be taken by another request coming in before processing has been completed
    data.id = undefined;
    //Returns the v4 UUID for use in consequent functions and middleware
    return id;
};

//Assigns a v4 UUID to a new entry, adds it to the data object, and returns the newly added entry
const addEntry = function(data, entry){
    const id = assignEntryId(data);
    entry.id = id;
    data[id] = entry;
    return data[id];
}

const calculatePoints = function(data){

}

module.exports = {
    assignEntryId,
    addEntry,
    calculatePoints
};













