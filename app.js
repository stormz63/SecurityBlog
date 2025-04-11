const identity = netlifyIdentity;

// Elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const blogForm = document.getElementById('blogForm');
const submitBlogBtn = document.getElementById('submitBlog');
const blogTitleInput = document.getElementById('blogTitle');
const blogContentInput = document.getElementById('blogContent');
const messageElement = document.getElementById('message');

// Show login modal when login button is clicked
loginBtn.addEventListener('click', () => {
  identity.open();
});

// Handle logout
logoutBtn.addEventListener('click', () => {
  identity.logout();
});

// Update UI when user logs in
identity.on('login', (user) => {
  console.log('User logged in:', user);
  updateUIForLoggedInUser();

  // Handle token in URL and prevent reload
  handleAuthRedirect();
});

// Handle logout event
identity.on('logout', () => {
  console.log('User logged out');
  updateUIForLoggedOutUser();
});

// Update the UI for logged-in users
function updateUIForLoggedInUser() {
  const user = identity.currentUser();
  if (user) {
    blogForm.style.display = 'block';
    logoutBtn.style.display = 'inline-block';
    loginBtn.style.display = 'none';
    messageElement.textContent = "Welcome, " + (user.user_metadata.full_name || user.email);
  }
}

// Update the UI for logged-out users
function updateUIForLoggedOutUser() {
  blogForm.style.display = 'none';
  logoutBtn.style.display = 'none';
  loginBtn.style.display = 'inline-block';
  messageElement.textContent = "Please log in to create a blog.";
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
  const user = identity.currentUser();
  if (user) {
    updateUIForLoggedInUser();
  } else {
    updateUIForLoggedOutUser();
  }

  // Handle the URL token after login
  handleAuthRedirect();
});

// Prevent URL redirect with token
function handleAuthRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('access_token');

  if (token) {
    // Store the token in localStorage or sessionStorage
    sessionStorage.setItem('access_token', token);

    // Remove the access_token from the URL to prevent it from staying in the browser address bar
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, '', newUrl);  // This prevents reload and updates the URL without the token
  }
}

// Submit the blog post
submitBlogBtn.addEventListener('click', () => {
  const title = blogTitleInput.value;
  const content = blogContentInput.value;
  const user = identity.currentUser();

  if (user) {
    const blogData = {
      title: title,
      content: content,
      author: user.user_metadata.full_name || user.email,
      createdAt: new Date().toISOString()
    };

    // Replace with actual blog submission logic (e.g., save to backend or a database)
    console.log('New Blog Post:', blogData);

    messageElement.textContent = "Blog created successfully!";
    
    // Reset form after submission
    blogTitleInput.value = '';
    blogContentInput.value = '';
  } else {
    messageElement.textContent = "You must be logged in to create a blog.";
  }
});
