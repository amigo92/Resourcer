var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


// user schema 
var LeadSchema   = new Schema({
	name: String,
	role: String,
	byID: String,
	compname: String,
	phnNumber: Number,
	createDate:{type:Date,default:Date.now},
	notifications:{
	
		type: Array,
		"default":[]
	}
	
});


module.exports = mongoose.model('Lead', LeadSchema);
