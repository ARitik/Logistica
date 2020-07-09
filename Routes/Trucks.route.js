const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
	next(new Error('Cannot obtain List of Trucks'));
});

module.exports = router;