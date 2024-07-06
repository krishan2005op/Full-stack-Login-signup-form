document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const emailOrPhone = document.getElementById('emailOrPhone').value;
  const password = document.getElementById('password').value;

  const data = { emailOrPhone, password };

  fetch('http://localhost:5010/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message);
    }
  })
  .catch(error => console.error('Error:', error));
});
