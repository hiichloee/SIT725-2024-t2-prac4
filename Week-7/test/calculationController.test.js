

let expect, request;

before(async () => {
  expect = (await import('chai')).expect;
  request = (await import('request')).default;
});


describe("Add Two Numbers", function () {
  
    it("should return 200 and the correct sum for positive numbers", function (done) {
        const url_1 = {
            url: 'http://localhost:3000/add?num1=30&num2=50',
            headers: {
                Accept: 'application/json', 
            },
        };
        request(url_1, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            body = JSON.parse(body);
            expect(body.result).to.equal(80);
            expect(body.statusCode).to.equal(200);
            done();
        });
    });
  
    it("should handle negative numbers correctly", function (done) {
        const url_2 = {
            url: 'http://localhost:3000/add?num1=-10&num2=-20',
            headers: {
                Accept: 'application/json', 
            },
        };
        request(url_2, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            body = JSON.parse(body);
            expect(body.result).to.equal(-30);
            expect(body.statusCode).to.equal(200);
            done();
        });
    });
  
    it("should return 400 when one or both parameters are missing", function (done) {
        const url_3 = {
            url: 'http://localhost:3000/add?num1=10',
            headers: {
                Accept: 'application/json', 
            },
        };
        request(url_3, function (error, response, body) {
            expect(response.statusCode).to.equal(400);
            body = JSON.parse(body);
            expect(body.statusCode).to.equal(400);
            expect(body.result).to.be.null;
            expect(body.message).to.equal('Please provide two numbers!');
            done();
        });
    });
  
    it("should handle zero values correctly", function (done) {
        const url_4 = {
            url: 'http://localhost:3000/add?num1=0&num2=0',
            headers: {
                Accept: 'application/json', 
            },
        };
        request(url_4, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            body = JSON.parse(body);
            expect(body.result).to.equal(0);
            expect(body.statusCode).to.equal(200);
            done();
        });
    });
  
    it("should handle large numbers correctly", function (done) {
        const url_5 = {
            url: 'http://localhost:3000/add?num1=1000000000&num2=2000000000',
            headers: {
                Accept: 'application/json', 
            },
        };
        request(url_5, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            body = JSON.parse(body);
            expect(body.result).to.equal(3000000000);
            expect(body.statusCode).to.equal(200);
            done();
        });
    });
  });
  
  describe("Add Two Strings or Invalid Input", function () {
  
    it("should return 400 for invalid non-numeric input", function (done) {
        const url_6 = `http://localhost:3000/add?num1=a&num2=b`;
        request(url_6, function (error, response, body) {
            expect(response.statusCode).to.equal(400);
            body = JSON.parse(body);
            expect(body.result).to.be.null;
            expect(body.statusCode).to.equal(400);
            done();
        });
    });
  
    it("should return 400 for special character input", function (done) {
        const url_7 = `http://localhost:3000/add?num1=!&num2=@`;
        request(url_7, function (error, response, body) {
            expect(response.statusCode).to.equal(400);
            body = JSON.parse(body);
            expect(body.result).to.be.null;
            expect(body.statusCode).to.equal(400);
            done();
        });
    });
  });
  
  describe("History Management", function () {
    const historyUrl = "http://localhost:3000/history";
  
    it("should return history with calculations", function (done) {
        const url_8 = `http://localhost:3000/history`;
        request(url_8, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
  
  });


