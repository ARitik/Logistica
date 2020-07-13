const createError = require('http-errors');
const mongoose = require('mongoose');

const Truck = require('../Models/Truck.model.js');

module.exports = {
	getAllTrucks : async (req,res,next) => {
	try {
		const result = await Truck.find({},{__v:0});
		res.send(result);
	}
	catch(error) {
		console.error(error.message);
	}
},
	getTruckById : async (req,res,next)=> {
	try {
		const id = req.params.id;
		const result = await Truck.findById(id);
		if(!result) {
			throw createError(404,"Truck does not exist with this specified ID");
		}
		res.send(result);
	}
	catch(error) {
		console.error(error.message);
		if(error instanceof mongoose.CastError) {
			next(createError(400,"Invalid Truck ID"));
			return;
		}
		next(error);
	}
},
	addNewTruck : async (req,res,next) => {
	try {
		const truck = new Truck(req.body);
		const result = await truck.save();
		res.send(result);
	}
	catch(error) {
		console.error(error.message);
		if(error.name === 'ValidationError') {
			next(createError(422,error.message))
			return;  
		}
	}
},
	deleteTruck : async (req,res,next) => {
	try {
		const id = req.params.id;
		const result = await Truck.findByIdAndDelete(id);
			if(!result) {
			throw createError(404,"Truck does not exist with this specified ID");
		}
		res.send(result);
	}catch(error) {
		console.error(error.message);
			if(error instanceof mongoose.CastError) {
			next(createError(400,"Invalid Truck ID"));
			return;
		}
		next(error);
	}
},
	updateTruck : async(req,res,next) => {
	try {
		const id = req.params.id; 
		const updates = req.body;
		const options = { new:true };
		const result = await Truck.findByIdAndUpdate(id,updates,options);
		if(!result) {
			throw createError(404,"Truck does not exist with this specified ID");
		}
		res.send(result);
	}catch(error) {
		console.error(error.message);
		if(error instanceof mongoose.CastError) {
			return next(createError(400,"Invalid Truck ID"));
		}
		next(error);
	}
}
}