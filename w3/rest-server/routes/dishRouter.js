var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

router.route('/')
//get all the dishes
.get(function(req,res,next){
  Dishes.find({}, function (err, dishes) {
    if (err) throw err;
    if(dishes === null)
      dishes = {}
    res.json(dishes);
  });
})
//create new dish
.post(function(req, res, next){
  Dishes.create(req.body, function(err, dish){
    if (err) throw err;
    //sres.status(201);
    res.json(dish);
  });
})
//remove all dishes from database
.delete(function(req, res, next){
  Dishes.remove({}, function(err, resp){
    if (err) throw err;
    res.json(resp);
  });
});

router.route('/:dishId')
.get(function(req,res,next){
  Dishes.findById(req.params.dishId,function(err,dish){
    if (err) throw err;
    res.json(dish);
  });
})

.put(function(req, res, next){
  Dishes.findByIdAndUpdate(req.params.dishId,{
    $set: req.body
  },{
    new: true
  },function(err,dish){
    if (err) throw err;
    res.json(dish);
  });
})

.delete(function(req, res, next){
  Dishes.remove(req.params.dishId, function(err, resp){
    if (err) throw err;
    res.json(resp);
  });
});

router.route('/:dishId/comments')
.get(function(req,res,next){
  Dishes.findById(req.params.dishId,function(err,dish){
    if (err) throw err;
    res.json(dish.comments);
  });
})
//add a new comment to the dish
.post(function(req, res, next){
  Dishes.findById(req.params.dishId, function(err,dish){
    if (err) throw err;

    dish.comments.push(req.body);
    dish.save(function(err, dish){
      if (err) throw err;
      res.json(dish);
    })
  });
})
//delete all the comments
.delete(function(req, res, next){
  Dishes.findById(req.params.dishId, function(err,dish){
    if (err) throw err;

    for(var i= (dish.comments.lenght - 1 ); i >= 0; i--){
      dish.comments.id(dish.comments[i]._id).remove;
    }

    dish.save(function(err, dish){
      if (err) throw err;
      res.json(dish);
    });
  });
});

router.route('/:dishId/comments/:commentId')
.get(function(req,res,next){
  Dishes.findById(req.params.dishId,function(err,dish){
    if (err) throw err;
    res.json(dish.comments.id(req.params.commentId));
  });
})

.put(function(req, res, next){
  //remove the existing comment and insert the updated comment as a new comment
  Dishes.findById(req.params.dishId,function(err,dish){
    if (err) throw err;
    dish.comments.id(req.params.commentId).remove();

    dish.comments.push(req.body);

    dish.save(function(err, dish){
      if (err) throw err;
      res.json(dish);
    });
  });
})

.delete(function(req, res, next){
  Dishes.findById(req.params.dishId,function(err,dish){
    if (err) throw err;
    dish.comments.id(req.params.commentId).remove();

    dish.save(function(err, dish){
      if (err) throw err;
      res.json(dish);
    });
  });
});

module.exports = router;
