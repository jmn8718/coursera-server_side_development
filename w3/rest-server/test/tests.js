var expect = require('chai').expect;
var request = require('request');
var MongoClient = require('mongodb').MongoClient;

var endpoint = 'http://localhost:3000';
var databaseUrl = 'mongodb://localhost:27017/conFusion';

var Dishes = require('../models/dishes');

function dropCollection( name, next ){
	console.log('Dropping collection '+name)
	MongoClient.connect(databaseUrl, function (err, db) {
		db.dropCollection(name, function (result) {
            console.log(result);
            db.close();
            next()
        });
	})
}
describe('Testing dishes API', function(){
	before(function(done){
		dropCollection("dishes", done)
	})

	describe('Testing /dishes', function(){
		var url = endpoint + '/dishes';
		it('should get all the dishes, it should have 0', function(done){
			request.get(url, function(err, res, body){
				body = JSON.parse(body)
				expect(res.statusCode).to.equal(200);
				expect(body.length).to.equal(0);
				done();
			});
		})

		it('should create a dish', function(done){
			var newDish = {
		        name: 'Uthapizza',
		        description: 'Test'
		    };
		    var options = {
			  method: 'post',
			  body: newDish,
			  json: true,
			  url: url
			}
			request.post(options,function(err, res, body){
				expect(res.statusCode).to.equal(200);
				done();
			});
		})

		it('should get all the dishes, it should have 1', function(done){
			request.get(url, function(err, res, body){
				body = JSON.parse(body)
				expect(res.statusCode).to.equal(200);
				expect(body.length).to.equal(1);
				done();
			});
		})
	})


	after(function(done){
		dropCollection("dishes", done)
	})

})