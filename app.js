// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/blogApp', { useNewUrlParser: true, useUnifiedTopology: true });
const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
});

const Blog = mongoose.model('Blog', blogSchema);

// Route for the blog submission form
app.get('/', (req, res) => {
  res.render('index'); // Renders the blog submission form
});

// Route to handle blog submissions
app.post('/submit', (req, res) => {
  const { title, body, captcha } = req.body;
  
  // Basic CAPTCHA check (you can replace this with actual CAPTCHA service)
  if (captcha !== "5") {
    return res.send('Incorrect CAPTCHA, please try again.');
  }
  
  // Create a new blog post and save it to the database
  const newBlog = new Blog({ title, body });
  newBlog.save((err, blog) => {
    if (err) {
      return res.send('Error saving your blog. Please try again.');
    }
    res.send('Blog submitted successfully! It will appear once approved.');
  });
});

// Admin route to approve/reject blog posts
app.get('/admin', (req, res) => {
  Blog.find({ approved: false }, (err, blogs) => {
    if (err) return res.send('Error retrieving posts.');
    res.render('admin', { blogs });
  });
});

// Route to approve a post
app.get('/approve/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, { approved: true }, (err) => {
    if (err) return res.send('Error approving post.');
    res.redirect('/admin');
  });
});

// Route to reject a post
app.get('/reject/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id, (err) => {
    if (err) return res.send('Error rejecting post.');
    res.redirect('/admin');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
