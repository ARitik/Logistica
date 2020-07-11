const express = require('express');
const router = express.Router();

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

router.get('/:id',async(req,res,next)=> {
	try {
		const id = req.params.id;
		const result = await Truck.find({_id: id},{__v:0});
		res.send(result);
	}
	catch(error) {
		console.error(error.message);
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



module.exports = router;