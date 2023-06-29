# Receipt-Processor-Challenge
## **Desctiption**

Fetch take home exercise: a small api used for processing, storing, and accessing receipts.

## **Technologies**
1. JavaScript
2. Node.js 
3. Express.js
4. Docker
---
## **Install**
1. If you do not already have Docker installed on your machine, you can downolad it from their official [website](https://www.docker.com/get-started/)
2. Navigate to the project's directory in the terminal.
3. Enter the following command to build the Docker image:
```
docker build . -t receipt-processor-gerber
```
4. Enter the following command to start the server:
```
docker run -p 3000:3000 receipt-processor-gerber
```
Note: You can name the containers if you would like by including --name \<container-name> after run, but personally, I like the goofy names it comes up with.

---
## **Testing**
1. Enter the following command to run the included testing suite:
```
docker run -p 3000:3000 receipt-processor-gerber npm run test
```
2. You can also use Postman or another similar API platform. If you do not already have Postman installed and wish to use it for testing you can do so from their official [website](https://www.postman.com/). Once launched enter "localhost:3000/" plus the desired route, "Body", "raw", "JSON" and include your desired body. After clicking send you will see the server's response.
---
## **Features**
### 1. Data stored in memory. 
* No need to set up a database to use the api.
* Data will not persist following a shutdown or restart.

### 2. Built to scale. 

* Moduler design allows new functionality to be added without affecting existing files.
* Route functionality is kept in seperate middleware functions to maintain separation of concerns and allow for re use in multiple routes.
* Helper functions are kept generic to allow for re-use by multiple modules for multiple purposes.
* Helper functions are used to obtain data, such that if the data storage method is changed, they can be refactored to return the same results, without affecting the rest of the server and allowing it to continue functioning as normal.

---
## **Summary of API Specification**
### Endpoint: Process Receipts

* Path: `/receipts/process`
* Method: `POST`
* Payload: Receipt JSON
* Response: JSON containing an id for the receipt.

### Description:

Takes in a JSON receipt (see example in the example directory), calculates the points value of the receipt, assigns a v4 UUID, and returns a JSON object with the ID.

How many points should be earned are defined by the rules below.

Example Response:
```json
{ "id": "7fb1377b-b223-49d9-a31a-5a02701dd310" }
```

### Endpoint: Get Points

* Path: `/receipts/{id}/points`
* Method: `GET`
* Response: A JSON object containing the number of points awarded.

### Description:
A simple Getter endpoint that looks up the receipt by the ID and returns an object specifying the points awarded.

Example Response:
```json
{ "points": 32 }
```
---
## **Rules**

These rules collectively define how many points should be awarded to a receipt.

* One point for every alphanumeric character in the retailer name.
* 50 points if the total is a round dollar amount with no cents.
* 25 points if the total is a multiple of `0.25`.
* 5 points for every two items on the receipt.
* If the trimmed length of the item description is a multiple of 3, multiply the price by `0.2` and round up to the nearest integer. The result is the number of points earned.
* 6 points if the day in the purchase date is odd.
* 10 points if the time of purchase is after 2:00pm and before 4:00pm.


## Examples

```json
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
}
```
```text
Total Points: 28
Breakdown:
     6 points - retailer name has 6 characters
    10 points - 4 items (2 pairs @ 5 points each)
     3 Points - "Emils Cheese Pizza" is 18 characters (a multiple of 3)
                item price of 12.25 * 0.2 = 2.45, rounded up is 3 points
     3 Points - "Klarbrunn 12-PK 12 FL OZ" is 24 characters (a multiple of 3)
                item price of 12.00 * 0.2 = 2.4, rounded up is 3 points
     6 points - purchase day is odd
  + ---------
  = 28 points
```

----

```json
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
```
```text
Total Points: 109
Breakdown:
    50 points - total is a round dollar amount
    25 points - total is a multiple of 0.25
    14 points - retailer name (M&M Corner Market) has 14 alphanumeric characters
                note: '&' is not alphanumeric
    10 points - 2:33pm is between 2:00pm and 4:00pm
    10 points - 4 items (2 pairs @ 5 points each)
  + ---------
  = 109 points
```
---
## **Acknowledgement**
Thank you to Fetch for creating this exercise and for providing the API specifications in this document.

