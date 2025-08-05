/* Modern Login Page - JavaScript Logic */
/* @description Firebase authentication with enhanced UX features */
/* @features Error handling, loading states, remember me, form validation */
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { app } from './firebase-config.js';

// Initialize Firebase Auth
const auth = getAuth(app);

// Get DOM elements
const loginForm = document.getElementById('login-form');
const loginInput = document.getElementById('loginInput');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const loginBtn = document.querySelector('.login-btn');

// Form submission handler
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const input = loginInput.value.trim();
  const password = passwordInput.value;

  // Validate inputs
  if (!input || !password) {
    showError('Please fill in all fields');
    return;
  }

  // Add loading state
  setLoadingState(true);
  hideError();

  // Check if input looks like an email
  const isEmail = /\S+@\S+\.\S+/.test(input);

  try {
    if (isEmail) {
      // Firebase authentication
      await signInWithEmailAndPassword(auth, input, password);
      
      // Success - you can redirect or show success message
      showSuccess("Logged in successfully!");
      
      // Optional: Redirect to dashboard or home page
      // window.location.href = '/dashboard.html';
      
    } else {
      // Handle username login - you'll need to implement this
      // For now, show error message
      showError("Username login not implemented yet. Please use your email address.");
    }
  } catch (error) {
    // Handle Firebase auth errors
    handleAuthError(error);
  } finally {
    setLoadingState(false);
  }
});

// Utility functions
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
  errorMessage.style.color = '#e53e3e';
  errorMessage.style.background = 'rgba(229, 62, 62, 0.1)';
  errorMessage.style.borderColor = 'rgba(229, 62, 62, 0.2)';
}

function showSuccess(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
  errorMessage.style.color = '#38a169';
  errorMessage.style.background = 'rgba(56, 161, 105, 0.1)';
  errorMessage.style.borderColor = 'rgba(56, 161, 105, 0.2)';
}

function hideError() {
  errorMessage.classList.remove('show');
}

function setLoadingState(isLoading) {
  if (isLoading) {
    loginBtn.classList.add('loading');
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;
  } else {
    loginBtn.classList.remove('loading');
    loginBtn.textContent = 'Login';
    loginBtn.disabled = false;
  }
}

function handleAuthError(error) {
  let errorMessage = 'An error occurred. Please try again.';
  
  switch (error.code) {
    case 'auth/user-not-found':
      errorMessage = 'No account found with this email address.';
      break;
    case 'auth/wrong-password':
      errorMessage = 'Incorrect password. Please try again.';
      break;
    case 'auth/invalid-email':
      errorMessage = 'Please enter a valid email address.';
      break;
    case 'auth/user-disabled':
      errorMessage = 'This account has been disabled.';
      break;
    case 'auth/too-many-requests':
      errorMessage = 'Too many failed attempts. Please try again later.';
      break;
    case 'auth/network-request-failed':
      errorMessage = 'Network error. Please check your connection.';
      break;
    default:
      errorMessage = error.message;
  }
  
  showError(errorMessage);
}

// Add input animations and validation
const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');

inputs.forEach(input => {
  // Real-time validation
  input.addEventListener('input', function() {
    if (this.value.trim() !== '') {
      this.style.borderColor = '#4299e1';
    } else {
      this.style.borderColor = '#e2e8f0';
    }
    
    // Hide error message when user starts typing
    if (errorMessage.classList.contains('show')) {
      hideError();
    }
  });

  // Enhanced focus effects
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateY(-2px)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'translateY(0)';
  });
});

// Password visibility toggle (optional enhancement)
function addPasswordToggle() {
  const passwordField = document.getElementById('password');
  const toggleButton = document.createElement('button');
  toggleButton.type = 'button';
  toggleButton.innerHTML = '👁️';
  toggleButton.style.cssText = `
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
  `;
  
  passwordField.parentElement.style.position = 'relative';
  passwordField.parentElement.appendChild(toggleButton);
  
  toggleButton.addEventListener('click', function() {
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleButton.innerHTML = '🙈';
    } else {
      passwordField.type = 'password';
      toggleButton.innerHTML = '👁️';
    }
  });
}

// Remember me functionality
const rememberMeCheckbox = document.getElementById('rememberMe');

// Save email if remember me is checked
loginForm.addEventListener('submit', () => {
  if (rememberMeCheckbox.checked) {
    localStorage.setItem('rememberedEmail', loginInput.value);
  } else {
    localStorage.removeItem('rememberedEmail');
  }
});

// Load remembered email on page load
window.addEventListener('load', () => {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail) {
    loginInput.value = rememberedEmail;
    rememberMeCheckbox.checked = true;
  }
});
