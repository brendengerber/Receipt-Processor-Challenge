//Imports necessary modules
const crypto = require('crypto')

//Creats a v4 UUID to an entry for any data object
const createEntryId = function(data){
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
};

const findEntry = function(data, id){
    let entry = data[id];
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