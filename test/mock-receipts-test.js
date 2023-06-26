//Mock receipt data to use for testing
let validMockReceipts = {
    'eed8a23b-fa23-4c5d-ac21-8f1a6ae91cb7':
        {
            "retailer": "Target",
            "purchaseDate": "2022-01-01",
            "purchaseTime": "13:01",
            "items": [
            {
                "shortDescription": "Mountain Dew 12PK",
                "price": "6.49"
            },{
                "shortDescription": "Emils Cheese Pizza",
                "price": "12.25"
            },{
                "shortDescription": "Knorr Creamy Chicken",
                "price": "1.26"
            },{
                "shortDescription": "Doritos Nacho Cheese",
                "price": "3.35"
            },{
                "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
                "price": "12.00"
            }
            ],
            "total": "35.35"
        },
    'a2c2a112-ce87-44d5-a846-d8920f2d2887':
        {
            "retailer": "M&M Corner Market",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "14:33",
            "items": [
            {
                "shortDescription": "Gatorade",
                "price": "2.25"
            },{
                "shortDescription": "Gatorade",
                "price": "2.25"
            },{
                "shortDescription": "Gatorade",
                "price": "2.25"
            },{
                "shortDescription": "Gatorade",
                "price": "2.25"
            }
            ],
            "total": "9.00"
        }
};

let emptyMocReceipts = [];

//Mock individual receipts to use for testing
let validMockReceipt = {
    "retailer": "Target",
    "purchaseDate": "2022-01-01",
    "purchaseTime": "13:01",
    "items": [
      {
        "shortDescription": "Mountain Dew 12PK",
        "price": "6.49"
      },{
        "shortDescription": "Emils Cheese Pizza",
        "price": "12.25"
      },{
        "shortDescription": "Knorr Creamy Chicken",
        "price": "1.26"
      },{
        "shortDescription": "Doritos Nacho Cheese",
        "price": "3.35"
      },{
        "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
        "price": "12.00"
      }
    ],
    "total": "35.35"
};

let invalidMockReceipt = {
    "wrongProperty": "Target",
    "purchaseDate": "Not a date",
    "purchaseTime": "Not a time",
    "items": [
      {
        "shortDescription": "Mountain Dew 12PK",
        "price": "Not a number"
      },{
        "shortDescription": "Emils Cheese Pizza",
        "price": "12.25"
      },{
        "wrongProperty": "Knorr Creamy Chicken",
        "price": "1.26"
      },{
        "shortDescription": "Doritos Nacho Cheese",
        "price": "3.35"
      },{
        "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
        "price": "12.00"
      }
    ],
    "total": "Not a number"
}


module.exports = {
    validMockReceipts,
    invalidMockReceipt,
    validMockReceipt,
    emptyMocReceipts
};