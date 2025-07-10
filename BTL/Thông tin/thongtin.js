document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("currentUser");

  if (!username) {
    document.getElementById("account-info").innerHTML = "<p>Bạn chưa đăng nhập.</p>";
    return;
  }

  const userData = JSON.parse(localStorage.getItem(username));

  if (!userData) {
    document.getElementById("account-info").innerHTML = "<p>Không tìm thấy thông tin tài khoản.</p>";
    return;
  }

  // Gán thông tin lên form
  document.getElementById("edit-username").textContent = username;
  document.getElementById("edit-fullname").value = userData.fullName || "";
  document.getElementById("edit-gender").value = userData.gender || "";
  document.getElementById("edit-birthdate").value = userData.birthdate || "";

  // Xử lý khi nhấn Lưu
  document.getElementById("edit-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("edit-fullname").value.trim();
    const gender = document.getElementById("edit-gender").value.trim().toLowerCase();
    const birthdate = document.getElementById("edit-birthdate").value.trim();

    // Kiểm tra dữ liệu
    const fullNameRegex = /^[A-Za-zÀ-ỹà-ỹ\s]+$/;

    if (!fullName || !fullNameRegex.test(fullName)) {
      alert("Họ và tên không hợp lệ.");
      return;
    }

    if (gender !== "nam" && gender !== "nữ") {
      alert("Giới tính chỉ được phép là Nam hoặc Nữ.");
      return;
    }

    const birth = new Date(birthdate);
    const today = new Date();
    if (!birthdate || isNaN(birth.getTime()) || birth >= today) {
      alert("Ngày sinh không hợp lệ.");
      return;
    }

    // Cập nhật dữ liệu
    const updatedData = {
      ...userData,
      fullName: fullName,
      gender: gender,
      birthdate: birthdate
    };

    localStorage.setItem(username, JSON.stringify(updatedData));

    alert("Cập nhật thông tin thành công!");
    window.location.href = encodeURI("../Đăng nhập trước và sau/index.html");
  });
});
