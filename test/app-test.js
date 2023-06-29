//Imports necessary modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json')
const expect = chai.expect;
const {mockData} = require('./mock-data.js')
const app = require('../app.js');
const {data} = require('../data/data.js')

chai.use(chaiHttp);
chai.use(chaiJson);

//Testing suite
describe('app', () => {
    describe('/receipts', () => {
        
        //Cleans up the data before each test
        beforeEach((done) => {
            data.setReceipts({});
            done();
        });
                                
        describe('/process POST', () => {   
            it('it should generate a v4 UUID, send it as a JSON object, and add it to the receipt if the receipt object is formatted properly', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.validMockReceiptOne).end((err, res) => {
                    expect(res.body).to.be.a.jsonObj();
                    expect(res).to.have.property('error').and.eql(false);
                    expect(res.body).to.have.property('id').and.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
                    expect(data.getReceipts()[res.body.id]).to.have.property('id').and.eql(res.body.id);
                    done();
                });
            });
            it('it should calculate the correct points value of the receipt and add it to the receipt object if the receipt object is formatted properly', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.validMockReceiptOne).end((err, res) => {
                    expect(data.getReceipts()[res.body.id]).to.have.property('points').and.eql(28);
                    done();
                });
            });
            it('it should save the receipt and send status code 201 if the receipt object is formatted properly', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.validMockReceiptOne).end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(err).to.be.null;
                    expect(res).to.have.property('error').and.eql(false);
                    expect(data.getReceipts()[res.body.id]).to.exist;
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the receipt object does not contain a retailer', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptNoRetailer).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.eql('The receipt format is invalid.\n Error: retailer is required.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the receipt object does not contain a retailer', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptNoRetailer).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.eql('The receipt format is invalid.\n Error: retailer is required.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the receipt object does not contain a purchase date', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptNoPurchaseDate).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.eql('The receipt format is invalid.\n Error: purchaseDate is required.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the receipt object\'s purchase date is not properly formatted', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptInvalidPurchaseDate).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.eql('The receipt format is invalid.\n Error: purchase date does not follow the YYYY-MM-DD date format.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the receipt object does not contain a purchase time', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptNoPurchaseTime).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.eql('The receipt format is invalid.\n Error: purchaseTime is required.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the receipt object\'s purchase time is not properly formatted', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptInvalidPurchaseTime).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.eql('The receipt format is invalid.\n Error: purchase time does not follow the HH:mm 24 hour time format.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the receipt object does not contain any items', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptNoItems).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.eql('The receipt format is invalid.\n Error: items is required.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if any items in the receipt object do not contain a short description', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptNoItemShortDescription).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.contain('Error: items.').and.contain('.shortDescription is required.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if any items in the receipt object do not contain a price', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptNoItemPrice).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.contain('Error: items.').and.contain('.price is required.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the prices of any items in the receipt object are not properly formatted', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptInvalidItemPrice).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.contain('The receipt format is invalid.\n Error: ').and.contain('\'s price does not follow the xxxx.xx currency format.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the receipt object does not contain a total', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptNoTotal).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.eql('The receipt format is invalid.\n Error: total is required.');
                    done();
                });
            });
            it('it should send a formatted error message with status code 400 if the receipt object\'s total is not properly formatted', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceiptInvalidTotal).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.eql('The receipt format is invalid.\n Error: total does not follow the xxxx.xx currency format.');
                    done();
                });
            });
            it('it should send a formatted compound error message with status code 400 if the receipt object has multiple errors', (done) => {
                chai.request(app).post('/receipts/process').send(mockData.invalidMockReceipt).end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.contain('The receipt format is invalid.');
                    expect(res.error.text).to.contain('Error: retailer is required.');
                    expect(res.error.text).to.contain('Error: items.4.shortDescription is required.');
                    expect(res.error.text).to.contain('Error: items.0.price is required.');
                    expect(res.error.text).to.contain('Error: purchase time does not follow the HH:mm 24 hour time format.');
                    expect(res.error.text).to.contain('Error: Doritos Nacho Cheese\'s price does not follow the xxxx.xx currency format.');
                    expect(res.error.text).to.contain('Error: total does not follow the xxxx.xx currency format.');
                    done();
                });
            });
        });

        describe('/:id/points GET', () => {
            it('it should look up the points value of a receipt and return it as a JSON object with status code 200 if the id exists', (done) => {
                data.setReceipts(mockData.validMockReceipts);
                chai.request(app).get('/receipts/eed8a23b-fa23-4c5d-ac21-8f1a6ae91cb7/points').end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.have.property('error').and.eql(false);
                    expect(res.body).to.be.a.jsonObj();
                    expect(res.body).to.have.property('points');
                    done();
                });
            });
            it('it should look up the points value of a receipt and send a formatted error with status code 404 if the id does not exists', (done) => {
                data.setReceipts(mockData.validMockReceipts);
                chai.request(app).get('/receipts/44c26086-af51-42cf-b2d7-2effd652c5af/points').end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.contain('The requested receipt with id ').and.contain(' does not exist.');
                    done();
                });
            });
            it('it should look up the points value of a receipt and send a formatted error with status code 400 if the id is not properly formatted', (done) => {
                data.setReceipts(mockData.validMockReceipts);
                chai.request(app).get('/receipts/abc/points').end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.have.property('error').and.not.eql(false);
                    expect(res.error.text).to.contain('The request ID ').and.contain(' is not a valid v4 UUID.')
                    done();
                });
            });
        });
    });
});