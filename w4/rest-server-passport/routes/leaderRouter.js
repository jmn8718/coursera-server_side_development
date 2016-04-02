var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Verify    = require('./verify');

var Leaderships = require('../models/leaderships');

router.route('/')
//get all the leaderships
.get(Verify.verifyOrdinaryUser, function(req,res,next){
  Leaderships.find({}, function (err, leaderships) {
    if (err) throw err;
    if(leaderships === null)
      leaderships = {}
    res.json(leaderships);
  });
})
//create new dish
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Leaderships.create(req.body, function(err, dish){
    if (err) throw err;
    //res.status(201);
    res.json(dish);
  });
})
//remove all leaderships from database
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Leaderships.remove({}, function(err, resp){
    if (err) throw err;
    res.json(resp);
  });
});

router.route('/:leadershipId')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
  Leaderships.findById(req.params.leadershipId,function(err,dish){
    if (err) throw err;
    res.json(dish);
  });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Leaderships.findByIdAndUpdate(req.params.leadershipId,{
    $set: req.body
  },{
    new: true
  },function(err,dish){
    if (err) throw err;
    res.json(dish);
  });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Leaderships.remove(req.params.leadershipId, function(err, resp){
    if (err) throw err;
    res.json(resp);
  });
});

module.exports = router;
