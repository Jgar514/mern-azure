require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const path = require("path");

// express app
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  // Serve index.html for any other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
