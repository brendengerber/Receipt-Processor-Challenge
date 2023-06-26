//Imports necessary modules
const request = require('supertest');
const {assert} = require('chai');
const expect = require('chai').expect;
const app = require('../app.js');

//Testing suite
describe('app', () => {
    describe('/receipts', () => {
        describe('/process POST request', () => {
            it('it should generate a v4 UUID for the new receipt and return it as a JSON object', async () => {
                const response = await request(app).post('/receipts/process');
                



                
            });
            it('it should send an error message if the receipt object is not properly formatted', async () => {

            });
        });
    });
});


//post
// should not POST the receipt if it is formatted incorrectly
// should POST a correctly formatted receipt and send the newly posted receipt


//test the test receipts to make sure they come to the correct points

//for get id
//it('it should send the proper ERROR message if the resource does not exist', async () => {});

//responses are type json