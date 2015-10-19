var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


// user schema 
var CurrentOrderSchema   = new Schema({
	name: String,
	role: String,
	byID: String,
	compname: String,
	phnNumber: Number,
	createDate:{type:Date,default:Date.now}
	
});


module.exports = mongoose.model('CurrentOrder', CurrentOrderSchema);
