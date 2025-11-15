document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const toggle = document.getElementById('togglePassword');
  const message = document.getElementById('message');

  // Toggle show/hide password
  toggle.addEventListener('click', function () {
    const isPassword = password.type === 'password';
    password.type = isPassword ? 'text' : 'password';
    toggle.textContent = isPassword ? 'Hide' : 'Show';
  });

  // Simple client-side validation and simulated submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    message.textContent = '';
    message.style.color = '';

    const em = email.value.trim();
    const pw = password.value || '';

    if (!em) {
      message.style.color = 'crimson';
      message.textContent = 'Please enter your email.';
      email.focus();
      return;
    }
    // basic email regex
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    if (!emailOk) {
      message.style.color = 'crimson';
      message.textContent = 'Please enter a valid email address.';
      email.focus();
      return;
    }
    if (pw.length < 5) {
      message.style.color = 'crimson';
      message.textContent = 'Password is required.';
      password.focus();
      return;
    }

    // Check credentials
    message.style.color = '#0b6b2f';
    message.textContent = 'Logging in...';
    
    setTimeout(function () {
      // Validate credentials
      if (em === 'admin@gmail.com' && pw === 'admin') {
        message.textContent = 'Login successful! Redirecting...';
        // Redirect to home page after successful login
        setTimeout(function() {
          window.location.href = 'home.html';
        }, 500);
      } else {
        message.style.color = 'crimson';
        message.textContent = 'Invalid email or password.';
      }
    }, 900);
  });
});
