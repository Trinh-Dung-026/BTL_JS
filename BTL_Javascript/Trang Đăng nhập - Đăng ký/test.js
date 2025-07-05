    document.getElementById("login-form").addEventListener("submit", function(e) {
        e.preventDefault(); // Ngăn reload form

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Biểu thức kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Biểu thức kiểm tra số điện thoại Việt Nam
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

    if (!username) {
        alert("Vui lòng nhập tên đăng nhập.");
        return;
    }

    if (!emailRegex.test(username) && !phoneRegex.test(username)) {
        alert("Tên đăng nhập hoặc Số điện thoại không hợp lệ");
        return;
    }

    if (!password) {
        alert("Vui lòng nhập mật khẩu.");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự.");
        return;
    }

    // Tạm thời hiển thị thành công (bạn có thể xử lý đăng nhập thực tế ở đây)
    alert("Đăng nhập thành công!");

    });
