var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name:   String,
    warmth: String,
    pattern:String,
    r:      Number,
    g:      Number,
    b:      Number,
    x:      Number,
    y:      Number,
    valueM:      Number,
    valueS:      Number,
    valueO:      Number,
});
ItemSchema.methods.calXY = function(cb) {
      var h, max, min;
      this.valueM = 0;
      this.valueS = 0;
      this.valueO = 0;
      max = Math.max(this.r, this.b, this.g);
      min = Math.min(this.r, this.b, this.g);
      switch (min) {
        case this.b:
          h = (this.g - this.r) / (max - min) * 60 + 60;
          break;
        case this.r:
          h = (this.b - this.g) / (max - min) * 60 + 180;
          break;
        case this.g:
          h = (this.r - this.b) / (max - min) * 60 + 300;
      }
      this.x = Math.abs(h - 180) - 90;
      this.y = max - 128;
      this.save(cb);
}
mongoose.model('Item', ItemSchema);
