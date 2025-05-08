document.addEventListener('DOMContentLoaded', async function() {
  // Check authentication status before loading the app
  const token = localStorage.getItem('token');
  
  if (!token) {
    redirectToLogin();
    return;
  }

  try {
    const authCheck = await verifyToken(token);
    if (!authCheck.valid) {
      redirectToLogin();
      return;
    }
    
    // Token is valid, initialize the application
    initApp(authCheck.user);
  } catch (err) {
    console.error('Authentication check failed:', err);
    redirectToLogin();
  }
});

async function verifyToken(token) {
  try {
    const response = await fetch('https://jpl-asset-form.onrender.com/api/verify-auth', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      valid: response.ok,
      user: response.ok ? await response.json() : null
    };
  } catch (err) {
    console.error('Token verification error:', err);
    return { valid: false };
  }
}

function redirectToLogin() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

function initApp(user) {
  // Your existing app initialization code
  console.log('User authenticated:', user);
  
  // Update UI with user info
  const userProfile = document.querySelector('.user-profile span');
  if (userProfile) {
    userProfile.textContent = user.name || user.username;
  }

  // Add logout functionality
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('token');
      redirectToLogin();
    });
  }

  // Rest of your existing app code...
}

// Make sure to include this script in your index.html
// <script src="auth.js"></script>
