

let expect, request;

before(async () => {
  expect = (await import('chai')).expect;
  request = (await import('request')).default;
});

describe("Add Two Numbers", function () {

    const url = `http://localhost:3000/add?num1=30&num2=50`;
    it("returns status 200 to check if api works", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
    it("returns statusCode key in body to check if api give right result should be 200", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
        });
    });
    it("returns the result as number", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('number');
            done()
        });
    });
    it("returns the result equal to 80", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.equal(80);
            done()
        });
    });
    it("returns the result not equal to 15", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.not.equal(15);
            done()
        });
    });
});


describe("Add Two strings", function () {
    var url = "http://localhost:3000/add?num1=a&num2=b";

    it("should return status 400 when invalid input is provided", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(400); 
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(400);
            done()
        });
    });
    it("returns the result as null", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('null');
            done()
        });
    });
});