require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Express app
const app = express();

app.set('port', process.env.PORT || 8181);
console.log("++++++++++++++++" + app.get('port'));


// Serve static files for React build
app.use(express.static('./frontend/build'));

// Middleware
app.use(express.json());

// Serve React index.html for all routes
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "frontend", "build",
		"index.html"));
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		// Listen for requests
		app.listen(port, () => {
			console.log('Connected to the database. Server is listening on port:', port);
		});
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
