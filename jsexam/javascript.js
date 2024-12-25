// Sample result data
const results = [
    { name: 'vivek', score: 85 },
    { name: 'jaydeep', score: 98 },
    { name: 'parth', score: 97 },
    { name: 'raj', score: 92 },
    { name: 'hiren', score: 87 },
    { name: 'ashish', score: 86 },

  ];
  
  // Function to switch between login and signup forms
  function toggleForm(formType) {
    if (formType === 'signup') {
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('signup-form').style.display = 'block';
    } else {
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('signup-form').style.display = 'none';
    }
  }
  
  // Function to handle sign-up
  function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (!email || !password) {
      document.getElementById('signup-error').textContent = 'Please fill all fields';
      return;
    }
  
    // Store user data in localStorage (just email and password for simplicity)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      document.getElementById('signup-error').textContent = 'User already exists';
      return;
    }
  
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Sign-up successful! You can now log in.');
    toggleForm('login');
  }
  
  // Function to handle login
  function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
      document.getElementById('login-error').textContent = 'Please fill all fields';
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Save user session (simulated by localStorage for this example)
      localStorage.setItem('currentUser', JSON.stringify(user));
      showResultPage();
    } else {
      document.getElementById('login-error').textContent = 'Invalid credentials';
    }
  }
  
  // Function to show the result page after successful login
  function showResultPage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
      window.location.href = '/';
      return;
    }
  
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
  
    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<ul>';
    results.forEach(result => {
      resultsDiv.innerHTML += `<li>${result.name}: ${result.score}</li>`;
    });
    resultsDiv.innerHTML += '</ul>';
  }
  
  // Function to handle logout
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  }
  
  // Check if the user is already logged in, if so, show the result page
  window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
      showResultPage();
    } else {
      document.getElementById('login-form').style.display = 'block';
    }
  };