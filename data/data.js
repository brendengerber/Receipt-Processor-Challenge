//The properties of a data object should be UUIDv4s that coorispond to a specific entry (such as a receipt object)

//Data object used to hold receipts
let receipts = {};

//This object's methods are used to access and manipulate the object where all receipts are stored so that any other module can have access to the exact same dataset
const data = {
    //Used to override the entire receipt dataset with a new dataset
    //"newReceipts" is a data object
    setReceipts: function(newReceipts){
        receipts = newReceipts;
    },
    //Used to save a receipt to the current dataset
    //"receipt" is a receipt object
    saveReceipt: function(receipt){
        receipts[receipt.id] = receipt;
    },
    //Used to get all of the receipts
    getReceipts: function(){
        return receipts;
    },
    //Used to get a specific receipt
    //"id" is a string corrisponding to the desired receipt
    getReceipt: function(id){
        return receipts[id];
    }
};

//Exports the 
module.exports = {
    data
};