const express = require('express');
const router = express.Router();



const TruckController = require('../Controllers/Truck.controller.js');

router.get('/',TruckController.getAllTrucks);
router.get('/:id',TruckController.getTruckById);
router.post('/',TruckController.addNewTruck);
router.delete('/:id', TruckController.deleteTruck);
router.patch('/:id', TruckController.updateTruck);


module.exports = router; 