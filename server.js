const express = require('express');
const { config } = require('dotenv');
const createError = require('http-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); 


const port = process.env.PORT;

config(); //dotenv config


const morgan = require('morgan'); // devDependency : rest_req logging
const helmet = require('helmet'); //Additional security headers

app.use(morgan('tiny'));
app.use(helmet());

//Initialize DB
require('./initDB')();


/*

GET POST PATCH DELETE GETBYID

/trucks
/trucks/:id

*/


const TruckRoute = require('./Routes/Trucks.route.js');
app.use('/trucks',TruckRoute);

//ERROR HANDLER 

app.use((req,res,next) => {
	// const error = new Error('Page not found!')
	// error.status = 404;
	// next(error);
	next(createError(404,'Page not Found!'));
})

app.use((err,req,res,next) => {
	res.status(err.status || 500) //500 - Internal Server Error defaults
	res.send({
		error: {
			status: err.status || 500,
			message: err.message 
		}
	})
})

app.listen(port || 5000,() => {
	console.log("Server started on PORT : " , port || 5000);
})
