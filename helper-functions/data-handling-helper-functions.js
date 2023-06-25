//Helper functions for reuse in middleware functions to access and manipulate the data
//These functions return false if the resource does not exist which allows middleware to check existance using an if statement and send a 404 if it does not exist
//These functions are generic and take a set of data as an argument so they can be used for receipts or any other data sets that may be added in the future
//These functions can be refactored if the location of the data is changed, allowing the middleware and routers to continue functioning normally (assuming the new functions here return the same results as the old)

//Returns data or returns false if no data exists
const getData = function(data){
    if(data.length === 0){
        return false
    }
    return data
}