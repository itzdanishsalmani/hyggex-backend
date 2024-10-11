const express = require('express'); // remove extra express import
const connectDB = require('./db/connection');
const userRoutes = require('./routes/users');

//correct import
const votingBoothRoutes = require('./db/schema/votingBoothSchema');

const app = express();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/voting-booth', votingBoothRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Buggy Backend API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});