require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Serve static files for React build
app.use(express.static("frontend/build"));

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Connect to the database
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected to the database");

		// Listen to port
		const port = process.env.PORT || 5000;
		app.listen(port, () => {
			console.log("Listening for requests on port", port);
		});
	})
	.catch((err) => {
		console.error("Error connecting to the database:", err);
	});