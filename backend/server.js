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

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("connected to database");
		// Listen to port
		const port = process.env.PORT || 5000;
		app.listen(port, () => {
			console.log("Listening for requests on port", port);
		});
	})
	.catch((err) => {
		console.log(err);
	});

app.use(express.static('./frontend/build'));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "frontend", "build",
		"index.html"));
});
