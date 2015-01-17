var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name:   String,
    warmth: String,
    pattern:String,
    //color:  {type: mongoose.Schema.Types.ObjectId, ref: 'color.server.model'}
    r:      Number,
    g:      Number,
    b:      Number,
});

mongoose.model('Item', ItemSchema);
