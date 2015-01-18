var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Item = mongoose.model('Item');
// var Color = mongoose.model('Color');
router.get('/allItems', function(req, res, next) {
    Item.find(function(err, items){
        if(err){ return next(err); }

        res.json(items);
    });
});

router.post('/addItem', function(req, res, next) {
    var item = new Item(req.body);
    item.save(function(err, item){
        if(err){ return next(err); }
        item.calXY();
        res.json(item);
    });
});

router.get('/filter', function(req, res, next) {
    console.log(req.query);
    Item.find(function(err, items){
           if(err){ return next(err); }
           console.log(items);
	   //TODO


           res.json(items);
        });

});

module.exports = router;
