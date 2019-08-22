var mongoose = require('mongoose')
var Schema = mongoose.Schema

var cartSchema  = new Schema({
   Items:[],
   TotalPrice:Number,
   discountPrice:Number,
   finalPrice:Number
});
module.exports = mongoose.model('item',cartSchema)