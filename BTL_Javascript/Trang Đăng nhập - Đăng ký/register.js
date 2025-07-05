document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const confirmPassword = document.getElementById("reg-confirm-password").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

    if (!username) {
      alert("Vui lòng nhập tên đăng nhập.");
      return;
    }

    if (!emailRegex.test(username) && !phoneRegex.test(username)) {
      alert("Tên đăng nhập phải là email hoặc số điện thoại hợp lệ.");
      return;
    }

    if (!password || password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    // Kiểm tra trùng tài khoản
    if (localStorage.getItem(username)) {
      alert("Tài khoản đã tồn tại.");
      return;
    }

    // Lưu tài khoản vào localStorage
    const userData = {
      password: password,
    };

    localStorage.setItem(username, JSON.stringify(userData));

    alert("Đăng ký thành công! Bạn có thể đăng nhập.");

    registerForm.reset();
    // Có thể chuyển hướng:
    // window.location.href = "login.html";
  });
});
