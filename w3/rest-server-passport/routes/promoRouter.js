var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Verify    = require('./verify');

var Promotions = require('../models/promotions');

router.route('/')
//get all the promotions
.get(Verify.verifyOrdinaryUser, function(req,res,next){
  Promotions.find({}, function (err, promotions) {
    if (err) throw err;
    if(promotions === null)
      promotions = {}
    res.json(promotions);
  });
})
//create new dish
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Promotions.create(req.body, function(err, dish){
    if (err) throw err;
    //res.status(201);
    res.json(dish);
  });
})
//remove all promotions from database
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Promotions.remove({}, function(err, resp){
    if (err) throw err;
    res.json(resp);
  });
});

router.route('/:promotionId')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
  Promotions.findById(req.params.promotionId,function(err,dish){
    if (err) throw err;
    res.json(dish);
  });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Promotions.findByIdAndUpdate(req.params.promotionId,{
    $set: req.body
  },{
    new: true
  },function(err,dish){
    if (err) throw err;
    res.json(dish);
  });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Promotions.remove(req.params.promotionId, function(err, resp){
    if (err) throw err;
    res.json(resp);
  });
});

module.exports = router;
