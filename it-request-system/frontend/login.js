document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginButton = document.getElementById('loginButton');
  const errorMessage = document.getElementById('errorMessage');

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    errorMessage.textContent = '';

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value;

    if (!username || !password) {
      errorMessage.textContent = 'Please enter both username and password.';
      return;
    }

    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        errorMessage.textContent = data.error || 'Login failed. Please try again.';
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Store JWT token in localStorage
      localStorage.setItem('token', data.token);

      // Redirect to main page (index.html)
      window.location.href = 'index.html';
    } catch (err) {
      console.error('Login error:', err);
      errorMessage.textContent = 'An error occurred. Please try again.';
      loginButton.disabled = false;
      loginButton.textContent = 'Login';
    }
  });
});
