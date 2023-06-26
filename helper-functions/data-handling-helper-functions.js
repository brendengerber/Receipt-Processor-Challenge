//Helper functions for reuse in middleware functions to access and manipulate data objects
//These functions return false if the resource does not exist which allows middleware to check existance using an if statement and send a 404 if it does not exist
//These functions are generic and take a set of data as an argument so they can be used for receipts or any other data sets that may be added in the future
//These functions can be refactored if the location of the data is changed, allowing the middleware and routers to continue functioning normally (assuming the new functions here return the same results as the old)

//The properties of a data object should be UUIDv4s that coorispond to a specific entry (such as a receipt)

//Imports necessary modules
const crypto = require('crypto')

//Assigns a UUIDv4 to an entry for any data object
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

//Assigns a UUIDv4 to a new entry, adds it to the data object, and returns the newly added entry
const postEntry = function(data, entry){
    const id = assignEntryId(data);
    entry.id = id;
    data[id] = entry;
    return data[id];
}

const calculatePoints = function(data){

}

module.exports = {
    assignEntryId,
    postEntry,
    calculatePoints
};













