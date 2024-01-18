require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Express app
const app = express();

const port = process.env.PORT || 8080;

// Serve static files for React build
const staticPath = path.join(__dirname, '..', 'frontend', 'build');
console.log('Static files path:', staticPath);
app.use(express.static(staticPath));

// Middleware
app.use(express.json());

// Serve React index.html for all routes
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB
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
