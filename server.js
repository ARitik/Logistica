const express = require('express');
const { connect } = require('mongoose');
const { config } = require('dotenv');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); 


const port = process.env.PORT;

config(); //dotenv config


const morgan = require('morgan'); // devDependency : rest_req logging
const helmet = require('helmet'); //Additional security headers

app.use(morgan('tiny'));
app.use(helmet());

//MongoDB Connection String : NodeJS 2.2+

const uri = `mongodb://cluster0-shard-00-00.16u1k.mongodb.net:27017,cluster0-shard-00-01.16u1k.mongodb.net:27017,cluster0-shard-00-02.16u1k.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-xlci0y-shard-0&authSource=admin&retryWrites=true&w=majority`

//MongoDB : Connection 

connect(uri, {
	dbName:process.env.DB_NAME,
	user:process.env.DB_USER,
	pass:process.env.DB_PASS,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	})
.then(() => {
	console.log('Connection estabislished with MongoDB');	
});



/*

GET POST PATCH DELETE GETBYID

/trucks
/trucks/:id


*/


const TruckRoute = require('./Routes/Trucks.route.js');
app.use('/trucks',TruckRoute);

//ERROR HANDLER 

app.use((req,res,next) => {
	const error = new Error('Page not found!')
	error.status = 404;
	next(error);
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
