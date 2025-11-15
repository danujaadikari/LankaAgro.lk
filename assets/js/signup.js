document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const terms = document.getElementById('terms');
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const message = document.getElementById('message');

  // Toggle show/hide password
  togglePassword.addEventListener('click', function () {
    const isPassword = password.type === 'password';
    password.type = isPassword ? 'text' : 'password';
    togglePassword.textContent = isPassword ? 'Hide' : 'Show';
  });

  // Toggle show/hide confirm password
  toggleConfirmPassword.addEventListener('click', function () {
    const isPassword = confirmPassword.type === 'password';
    confirmPassword.type = isPassword ? 'text' : 'password';
    toggleConfirmPassword.textContent = isPassword ? 'Hide' : 'Show';
  });

  // Form validation and submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    message.textContent = '';
    message.style.color = '';

    const name = fullname.value.trim();
    const em = email.value.trim();
    const pw = password.value || '';
    const cpw = confirmPassword.value || '';

    // Validate full name
    if (!name || name.length < 2) {
      message.style.color = 'crimson';
      message.textContent = 'Please enter your full name.';
      fullname.focus();
      return;
    }

    // Validate email
    if (!em) {
      message.style.color = 'crimson';
      message.textContent = 'Please enter your email.';
      email.focus();
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    if (!emailOk) {
      message.style.color = 'crimson';
      message.textContent = 'Please enter a valid email address.';
      email.focus();
      return;
    }

    // Validate password
    if (pw.length < 8) {
      message.style.color = 'crimson';
      message.textContent = 'Password must be at least 8 characters.';
      password.focus();
      return;
    }

    // Confirm password match
    if (pw !== cpw) {
      message.style.color = 'crimson';
      message.textContent = 'Passwords do not match.';
      confirmPassword.focus();
      return;
    }

    // Check terms acceptance
    if (!terms.checked) {
      message.style.color = 'crimson';
      message.textContent = 'You must agree to the Terms & Conditions.';
      terms.focus();
      return;
    }

    // Simulate signup process
    message.style.color = '#0b6b2f';
    message.textContent = 'Creating your account...';
    
    setTimeout(function () {
      message.textContent = 'Account created successfully! Redirecting to login...';
      setTimeout(function() {
        window.location.href = 'login.html';
      }, 1500);
    }, 1000);
  });
});
