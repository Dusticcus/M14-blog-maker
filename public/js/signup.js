const loginFormHandlerSignup = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-signup').value.trim();
    const name = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(name);
  
    if (email && password && name) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert('Failed to sign up');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', loginFormHandlerSignup);