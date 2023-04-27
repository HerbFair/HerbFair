const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://pamodya:pamodya123@cluster0.bgxtdas.mongodb.net/SHOPIT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Define API routes
app.use('/api/admin/delivery', require('./routes/delivery'));


// Serve static files (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
const port = process.env.PORT || 8091;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
