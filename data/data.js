//Variable used to hold receipts in lieu of a database
let receipts = {};

//This object's methods are used to access and manipulate the object where all receipts are stored so that any other module can have access to the same set
const data = {
    //Used to override the entire set of receipts with a defferent set
    setReceipts: function(newReceipts){
        receipts = newReceipts;
    },
    //Used to save a receipt to the current set
    saveReceipt: function(newReceipt){
        receipts[newReceipt.id] = newReceipt;
    },
    //Used to get all of the receipts
    getReceipts: function(){
        return receipts;
    }
};

module.exports = {
    data
};