const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/cyberblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Define blog schema and model
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

// Route for handling blog submission (POST request)
app.post('/submit-blog', (req, res) => {
  const { title, content } = req.body;

  const newBlog = new Blog({
    title: title,
    content: content,
  });

  newBlog.save((err) => {
    if (err) {
      return res.status(500).send('Error saving blog post.');
    }
    res.send('Blog post submitted successfully!');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
