document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const confirmPassword = document.getElementById("reg-confirm-password").value.trim();
    const fullName = document.getElementById("reg-fullname").value.trim();
    const gender = document.getElementById("reg-gender").value.trim().toLowerCase();
    const birthdate = document.getElementById("reg-birthdate").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
    const fullNameRegex = /^[A-Za-zÀ-ỹà-ỹ\s]+$/; // Họ tên tiếng Việt có dấu

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

    if (!fullName) {
      alert("Vui lòng nhập họ và tên.");
      return;
    }

    if (!fullNameRegex.test(fullName)) {
      alert("Họ và tên chỉ được chứa chữ cái và khoảng trắng.");
      return;
    }

    if (!birthdate) {
      alert("Vui lòng nhập ngày sinh.");
      return;
    }

    const birth = new Date(birthdate);
    const today = new Date();
    if (isNaN(birth.getTime()) || birth >= today) {
      alert("Ngày sinh không hợp lệ.");
      return;
    }

    if (gender !== "nam" && gender !== "nữ") {
      alert("Giới tính chỉ được phép là Nam hoặc Nữ.");
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
      fullName: fullName,
      gender: gender,
      birthdate: birthdate
    };

    localStorage.setItem(username, JSON.stringify(userData));

    // Ghi nhớ người dùng đang đăng nhập
    localStorage.setItem("currentUser", username);

    alert("Đăng ký thành công!");

    registerForm.reset();

    window.location.href = "login.html";
  });
});
