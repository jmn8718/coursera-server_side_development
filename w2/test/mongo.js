var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var config = require('../config/config');
// Connection URL
var url = config.mongodbUrl;

describe('MongoDB', function(){
    describe('creation',function(){
        it('should create an object in the db', function(done){
            // Use connect method to connect to the Server
            MongoClient.connect(url, function (err, db) {
                assert.equal(err,null);
                console.log("Connected correctly to server");
                var collection = db.collection("dishes");
                collection.insertOne({name: "Uthapizza", description: "test"}, function(err,result){
                    assert.equal(err,null);
                    console.log("After Insert:");
                    console.log(result.ops);
                    collection.find({}).toArray(function(err,docs){
                        assert.equal(err,null);
                        console.log("Found:");
                        console.log(docs);
                        db.dropCollection("dishes", function(err, result){
                           assert.equal(err,null);
                           db.close();
                           done();
                        });
                    });
                });
            });
        })
    })
})
