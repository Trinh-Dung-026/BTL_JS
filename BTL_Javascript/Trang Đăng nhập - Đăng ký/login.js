document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Ngăn reload form

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Biểu thức kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Biểu thức kiểm tra số điện thoại Việt Nam
        const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

        // Kiểm tra trường username
        if (!username) {
            alert("Vui lòng nhập tên đăng nhập.");
            return;
        }

        if (!emailRegex.test(username) && !phoneRegex.test(username)) {
            alert("Tên đăng nhập hoặc số điện thoại không hợp lệ.");
            return;
        }

        // Kiểm tra trường password
        if (!password) {
            alert("Vui lòng nhập mật khẩu.");
            return;
        }

        if (password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        // Giả lập kiểm tra thông tin với localStorage
        const userData = JSON.parse(localStorage.getItem(username));

        if (!userData) {
            alert("Tài khoản không tồn tại.");
            return;
        }

        if (userData.password !== password) {
            alert("Mật khẩu không đúng.");
            return;
        }

        alert("Đăng nhập thành công!");
        // Ở đây có thể chuyển hướng hoặc lưu thông tin phiên
        window.location.href = encodeURI("../Trang Chủ/index.html");
    });
});
