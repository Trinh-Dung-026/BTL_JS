document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("forgot-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("forgot-username").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    if (!username) {
      alert("Vui lòng nhập tên đăng nhập.");
      return;
    }

    if (!localStorage.getItem(username)) {
      alert("Tài khoản không tồn tại.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    // Cập nhật mật khẩu mới vào localStorage
    const userData = JSON.parse(localStorage.getItem(username));
    userData.password = newPassword;
    localStorage.setItem(username, JSON.stringify(userData));

    alert("Đặt lại mật khẩu thành công! Bạn có thể đăng nhập.");
    form.reset();
    window.location.href = "login.html";
  });
});
