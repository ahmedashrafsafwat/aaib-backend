const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

chai.use(chaiHttp);
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

// get tables
const  Report  = require('../models/report');


/**
 * Reports Tests
 */
describe("Unit tests", function() {

  /* 
  * Clean Up the reports used for tests
  * as we have only one database and no test database
  * so lets change the tested upon doucment to make it go back to OPEN state before each test
  */
  beforeEach(async function(){ 
    await Report.updateOne({"payload.reportId": "6706b3ba-bf36-4ad4-9b9d-4ebf4f4e2429"}, 
    {state:"OPEN",ticketState:"","updated":""})
  });

  describe("Testing reports services", function() {
    it("Should be able to get all reports ", done => {
      chai
        .request(server)
        .get("/reports")
        .end((err, res) => {
          // Check for returned result
          expect(res.body).to.have.all.keys('code','success','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Reports');
          expect(res.body.data[0]).to.have.all.keys(
            "_id",
            "source",
            "sourceIdentityId",
            "reference",
            "state",
            "payload",
            "ticketState",
            "created",
            "updated",
            "__v"
          );
          // console.log (result);
          done();
        });
    });
    it("Should be to resolve a ticket", done => {
      chai
        .request(server)
        .put("/reports/6706b3ba-bf36-4ad4-9b9d-4ebf4f4e2429")
        .set("Content-Type", "application/json")
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','success','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Successfully RESOLVED this ticket');
          
          done();
        });
    });
    it("Should be to block a source", done => {
      chai
        .request(server)
        .put("/reports/block/6706b3ba-bf36-4ad4-9b9d-4ebf4f4e2429")
        .set("Content-Type", "application/json")
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','success','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Successfully BLOCKED this ticket');

          done();
        });
    });
  })



});


