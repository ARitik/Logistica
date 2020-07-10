const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TruckSchema = new Schema({
	brand: {
		type: String,
		required: true
	},
	model: {
		type: String ,
		required: true
	},
	variant: {
		type: String,
		required: true
	},
	engine: {
		type: String,
		required: true
	},
	truckStatus: {
		type: String,
		required:true
	},
	oilCheck: Boolean,
	mileage: Number,
	checkEngine: Boolean,
	tireReplacement: Boolean,
	electricalIssues: Boolean,
	date: {
		type:Date,
		default:Date.now
	}
});

const Truck = mongoose.model('truck',TruckSchema);

module.exports = Truck;