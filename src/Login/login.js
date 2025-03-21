// Import the Microsoft login function from your auth file
import { login } from './microsoft.js';

// Check and apply dark mode setting on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}



// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const logo = document.getElementById('logo');

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    // Dark mode is enabled
    localStorage.setItem('theme', 'dark');
    darkModeToggle.textContent = "☀️ Light Mode";
    logo.src = 'src/assets/darkmodeLogo.png';
  } else {
    // Light mode is enabled
    localStorage.setItem('theme', 'light');
    darkModeToggle.textContent = "🌙 Dark Mode";
    logo.src = 'src/assets/lightmodeLogo.png';
  }
});



   

// Handle Microsoft sign-in
const msLoginBtn = document.getElementById('ms-login-btn');
let isLoginInProgress = false; // To track if login is in progress

msLoginBtn.addEventListener('click', async () => {
  if (isLoginInProgress) {
    console.log('Login is already in progress, please wait...');
    return;
  }

  try {
    isLoginInProgress = true; // Mark login as in progress
    console.log('Trying login, please wait...');
    await login();  // Await the login function from auth.js
    window.location.href = 'computle.html';
  } catch (error) {
    console.error('Microsoft login error:', error);
  } finally {
    isLoginInProgress = false; // Reset the flag after the attempt
  }
});

// Handle play as guest option
const guestBtn = document.getElementById('guest-btn');
guestBtn.addEventListener('click', () => {
  window.location.href = 'computle.html';
});
