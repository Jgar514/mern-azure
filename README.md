# Folder Structure

````markdown
├── workflows/          # GitHub Actions workflows
├── client/             # Frontend React application
├── controllers/        # Backend controllers for handling routes
├── middleware/         # Backend middleware functions
├── models/             # Backend Mongoose models for interacting with MongoDB
├── routes/             # Backend Express.js routes
└── server.js           # Main backend server file

# MERN Fullstack Workout Tracker

This is a full-stack workout tracker application built with React.js for the frontend and Node.js with Express.js for the backend. MongoDB is used as the database, with Mongoose for schema and model interactions.

## Features

### Frontend

- The frontend is located in the `client` folder and is built using React.js.
- Utilizes React context for global state management.
- Provides a simple yet effective workout tracking interface.

### Backend

- The backend is built with Node.js and Express.js.
- Organized into routes, controllers, middleware, and models folders for better code structure.
- Utilizes Mongoose for schema and model definitions to interact with the MongoDB database.

## Authentication

- Implements user authentication using JSON Web Tokens (JWT) and bcrypt for password hashing.
- Allows users to log in securely and access protected routes.