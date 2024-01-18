require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

app.set('port', process.env.PORT || 5000);
console.log("+++++++++++++++" + app.get('port'));

const staticPath = path.join(__dirname, '..', 'frontend', 'build');
console.log('Static files path:', staticPath);

// Serve static files for React build
app.use(express.static(staticPath));

// middleware
app.use(express.json());

// Serve React index.html for all routes
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
			console.log('connected to db & listening on port', process.env.PORT);
		});
	})
	.catch((error) => {
		console.log(error);
	});
