# MovieVault

MovieVault is a full-stack MERN web application for managing and reviewing movies.

## Features

- Add movies
- Edit movie information
- Delete movies
- Search/filter movies
- Store movie genres and reviews
- MongoDB Atlas integration
- Responsive React frontend
- REST API backend using Express.js

## Technologies Used

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Project Structure

movievault/
- backend/
  - controllers/
  - models/
  - routes/
- frontend/
  - src/
- README.md

## Installation

### Backend

cd backend
npm install

Create a .env file inside the backend folder with:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Then start the backend:

npm run dev

### Frontend

cd frontend
npm install
npm run dev

## Future Improvements

- User authentication
- Movie poster uploads
- Rating analytics dashboard