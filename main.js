import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth ,GoogleAuthProvider ,signInWithPopUp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjQaDACb3K08Rai9WHBl5qjttj0_OYHzU",
  authDomain: "blogsite-403cf.firebaseapp.com",
  databaseURL: "https://blogsite-403cf-default-rtdb.firebaseio.com",
  projectId: "blogsite-403cf",
  storageBucket: "blogsite-403cf.firebasestorage.app",
  messagingSenderId: "187790274016",
  appId: "1:187790274016:web:cd7f55fa2d6906bdb94f85"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new googleAuthProvider();


const googleLogin = document.getElementById("google-login-btn")
googleLogin.addEventListener("click", function(){
    alert(5)
})