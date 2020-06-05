const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect(
	'mongodb+srv://user:' +
		process.env.MONGO_ATLAS_PW +
		'@noderest-shop-9pcah.mongodb.net/test?retryWrites=true&w=majority',
	{ useNewUrlParser: true }
);

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
	console.log('Connected to mongo database');
});

mongoose.connection.on('error', (err) => {
	console.log('Error at mongoDb', err);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Origin', 'Origin, X-requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		req.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, GET, DELETE');
		return res.status(200).json({});
	}
});

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
