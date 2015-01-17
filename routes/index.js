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
    })
});
router.post('/addItem', function(req, res, next) {
    console.log(req.body);
    var item = new Item(req.body);
    item.save(function(err, item){
        if(err){ return next(err); }

        res.json(item);
    });
});

// router.post('/filterItems', function(req, res, next) {
//     var item = new Item(req.body);
// })

// router.param('post',function(req, res, next, id) {
//     var query = Post.findById(id);

//     query.exec(function (err, post){
//         if (err) { return next(err);}
//         if (!post) { return  next(new Error("can't find post")); }

//         req.post = post;
//         return next();
//     });
// });

module.exports = router;
