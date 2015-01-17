var mongoose = require('mongoose');

var ColorSchema = new mongoose.Schema({
    r:      Number,
    g:      Number,
    b:      Number,
    // x:      Number,
    // y:      Number
});

mongoose.model('Color', ColorSchema);
