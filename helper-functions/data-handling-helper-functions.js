//This file contains helper functions that manipulate a dataset 
//The helper functions are kept generic to allow for re-use by multiple modules for multiple purposes
//If the data storrage method is changed, these functions can be refactored to return the same results without affecting the rest of the server and allowing it to continue functioning as normal

//Imports necessary modules
const crypto = require('crypto');
const {data} = require('../data/data.js');

//Creats a unique v4 UUID
//"dataSet" is a string to identify which data object to access to verify uniqueness and reserve the id
const createEntryId = function(dataSet){
    try{
        let newId;
        let unique = false;
        //Continues generating v4 UUIDs until a unique one is generated
        while(!unique){
            newId = crypto.randomUUID();
            unique = !data["get"+dataSet]().hasOwnProperty(newId);
        }
        //Reserves the v4 UUID so it cannot be taken by another request coming in before processing has been completed
        data["save"+dataSet.slice(0, -1)]({id: newId});
        //Returns the v4 UUID for use in consequent functions and middleware
        return newId;
    }catch(err){
        throw err;
    }
};

//Adds an entry to a dataset
//"dataSet" is a string to identify which data object to access 
//"entry" is an object such as a receipt
const addEntry = function(dataSet, entry){
    try{
        data["save"+dataSet.slice(0, -1)](entry);
    }catch(err){
        throw err;
    }
};

//Finds and returns an entry from a dataset, if the entry does not exist it will return false so the middleware can create and send a 404 error
//"dataset" is a string to identify which data object to access
//"id" is a string to identify the desired entry
const findEntry = function(dataSet, id){
    let entry = data["get"+dataSet.slice(0, -1)](id);
    if(entry){
        return entry;
    }else{
        return false;
    }
};

//Calculates the points of a receipt and returns the final amount
//"receipt" is a valid receipt object
const calculateReceiptPoints = function(receipt){
    try{
        let points = 0;
        //Adds 1 point for every alphanumeric character in the retailer name
        points += receipt.retailer.replace(/[^0-9a-z]/gi, '').length;
        //Adds 50 points if the total is a round dollar amount with no cents
        if(Number.isInteger(Number(receipt.total))){
            points += 50;
        }
        // Adds 25 points if the total is a multiple of .25
        if(Number(receipt.total) % .25 === 0){
            points += 25;
        }
        //Adds 5 points for every two items on the receipt
        points += Math.floor((receipt.items.length)/2) * 5;
        //Adds points equal to the price of the item multiplied by .2 and rounded up if the trimmed length of the description is a multiple of 3
        for(let item of receipt.items){
            if(item.shortDescription.trim().length % 3 === 0){
                points += Math.ceil(Number(item.price) * .2);
            }
        }
        //Adds 6 points if the day in the purchase date is odd
        if(receipt.purchaseDate.slice(-2) % 2 !== 0){
            points += 6;
        }
        //Adds 10 points if the time of purchase is after 2:00pm and before 4:00pm
        const hourOfPurchase = receipt.purchaseTime.slice(0,2);
        if(hourOfPurchase >= 14 && hourOfPurchase <= 15){
            points += 10;
        }
        return points;
    }catch(err){
        throw err;
    }

};

//Exports functions to be used in other modules
module.exports = {
    createEntryId,
    addEntry,
    findEntry,
    calculateReceiptPoints
};

