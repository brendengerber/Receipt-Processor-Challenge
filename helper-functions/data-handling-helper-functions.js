//Imports necessary modules
const crypto = require('crypto');
const {data} = require('../data/data.js');


//Creats a v4 UUID to an entry for any data object, dataSet is a string to identify which dataSet to access
const createEntryId = function(dataSet){
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
};

//Adds an entry to the data object, dataSet is a string to identify which dataSet to access
const addEntry = function(dataSet, entry){
    data["save"+dataSet.slice(0, -1)](entry);
    return true;
};

const findEntry = function(dataSet, id){
    let entry = data["get"+dataSet]()[id]
    if(entry){
        return entry;
    }else{
        return false;
    }
};

const calculateReceiptPoints = function(receipt){
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
};

module.exports = {
    createEntryId,
    addEntry,
    findEntry,
    calculateReceiptPoints
};

