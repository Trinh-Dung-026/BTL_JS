const sidebar = document.getElementById('sidebar');
const openBtn = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () =>{
    sidebar.classList.add('active');
    })

closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });


const guestToggle = document.getElementById('guest-toggle');
const guestDropdown = document.getElementById('guest-dropdown');
const guestValues = {
    rooms : 0,
    adults: 0,
    children : 0
    };

guestToggle.addEventListener("click", (event) =>{
    event.stopPropagation(); // Ngăn chặn đóng ngay lập tức do trình nghe sự kiện click trên document
    guestDropdown.style.display = guestDropdown.style.display === "block" ? "none" : "block";
    });

document.querySelectorAll(".stepper .plus").forEach(btn => {
    btn.addEventListener("click", () => {
        const valueE1 = btn.previousElementSibling;
        const type = valueE1.dataset.type;
        guestValues[type]++;
        valueE1.textContent = guestValues[type];
        updateGuestInput();
    });
});

document.querySelectorAll(".stepper .minus").forEach(btn => {
    btn.addEventListener("click", () => {
        const valueE1 = btn.nextElementSibling;
        const type = valueE1.dataset.type;
        if (guestValues[type] > 0) {
            guestValues[type]--;
            valueE1.textContent = guestValues[type];
            updateGuestInput();
        }
    });
});


//Ẩn dropdown khi click ra ngoài
document.addEventListener("click", (e) => {
    if (!guestToggle.contains(e.target) && !guestDropdown.contains(e.target)) {
        guestDropdown.style.display = "none";
    }
});

