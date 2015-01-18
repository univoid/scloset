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
    Item.find(function(err, items){
        if(err){ return next(err); }
        // console.log(items);
        items = mainFiler(items, parseInt(req.query.degree), req.query.weather, req.query.feeling, req.query.aim)
        console.log(items);
        res.json(items);
    });

});

module.exports = router;
//Filter define
var mainFiler = function(i, degree, weather, feeling, aim) {
    var item, items, valueA, valueF, valueW, x, y, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
    items = i;

    items = items.filter(function(item) {
      var _ref, _ref1, _ref2;
      switch (false) {
        case !((-10 < degree && degree < 10)):
          return (_ref = item.warmth) === 'winter';
        case !((10 <= degree && degree < 25)):
          return (_ref1 = item.warmth) === 'spring' || _ref1 === 'Autumn';
        case !((25 <= degree && degree < 40)):
          return (_ref2 = item.warmth) === 'summer';
      }
    });

    items = items.filter(function(item) {
      var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      switch (false) {
        case aim !== 'hiking':
          return (_ref = item.pattern) === 'sport' || _ref === 'casual';
        case aim !== 'sport':
          return (_ref1 = item.pattern) === 'sport' || _ref1 === 'casual';
        case aim !== 'shopping':
          return (_ref2 = item.pattern) === 'casual';
        case aim !== 'home':
          return (_ref3 = item.pattern) === 'casual';
        case aim !== 'school':
          return (_ref4 = item.pattern) === 'office' || _ref4 === 'casual';
        case aim !== 'office':
          return (_ref5 = item.pattern) === 'office';
      }
    });
    console.log(items);
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      x = item.x;
      y = item.y;
      valueW = 100;
      switch (weather) {
        case 'sun':
          valueW *= ((_ref = y > 0) != null ? _ref : {
            1: -1.
          }) * Math.sqrt(x * x + y * y) / 156 * 10;
          break;
        case 'cloud':
          valueW *= ((_ref1 = y < 0) != null ? _ref1 : {
            1: -1.
          }) * y / 128 * 5;
          break;
        case 'rain':
          valueW *= ((_ref2 = x > 0) != null ? _ref2 : {
            1: -1.
          }) * x / 90 * 5;
          break;
        case 'snow':
          valueW *= 5;
      }
      valueF = 100;
      switch (feeling) {
        case 'happy':
          valueF *= ((_ref3 = y > 0) != null ? _ref3 : {
            1: -1.
          }) * Math.sqrt(x * x + y * y) / 156 * 5;
          break;
        case 'sad':
          valueF *= ((_ref4 = x > 0) != null ? _ref4 : {
            1: -1.
          }) * Math.sqrt(x * x + y * y) / 156 * 10;
          break;
        case 'angry':
          valueF *= ((_ref5 = y < 0) != null ? _ref5 : {
            1: -1.
          }) * Math.sqrt(x * x + y * y) / 156 * 5;
          break;
        case 'nothing':
          valueF *= 5;
      }
      valueA = 100;
      switch (aim) {
        case 'office':
          valueA *= ((_ref6 = x > 0) != null ? _ref6 : {
            1: -1.
          }) * Math.sqrt(x * x + y * y) / 156 * 10;
          break;
        case 'school':
          valueA *= 5;
          break;
        case 'shopping':
          valueA *= 5;
          break;
        case 'home':
          valueA *= 5;
          break;
        case 'hiking':
          valueA *= ((_ref7 = y < 0) != null ? _ref7 : {
            1: -1.
          }) * Math.sqrt(x * x + y * y) / 156 * 5;
          break;
        case 'sport':
          valueA *= ((_ref8 = y > 0) != null ? _ref8 : {
            1: -1.
          }) * Math.sqrt(x * x + y * y) / 156 * 5;
      }
      item.valueM = valueW + valueF + valueA;
    }
    items.sort(function(a, b) {
      return b.valueM - a.valueM;
    });

    return items;
};
