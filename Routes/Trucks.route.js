const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const mongoose = require('mongoose');

const Truck = require('../Models/Truck.model.js');

router.get('/',async (req,res,next) => {
	try {
		const result = await Truck.find({},{__v:0});
		res.send(result);
	}
	catch(error) {
		console.error(error.message);
	}
});

router.get('/:id',async (req,res,next)=> {
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
})

router.post('/',async (req,res,next) => {
	try {
		const truck = new Truck(req.body);
		const result = await truck.save();
		res.send(result);
	}
	catch(error) {
		console.error(error.message);

	}
})

router.delete('/:id', async (req,res,next) => {
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
})

router.patch('/:id', async(req,res,next) => {
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
})


module.exports = router;