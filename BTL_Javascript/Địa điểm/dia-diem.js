const sidebar = document.getElementById('sidebar');
        const openBtn = document.querySelector('.sidebar-toggle');
        const closeBtn = document.querySelector('.close-btn');

        openBtn.addEventListener('click', () =>{
            sidebar.classList.add('active');
        })

        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });

// Hàm chuyển hướng sang tours khi click vào box

document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('click', function() {
        const diaDiem = card.dataset.DiaDiem;
        window.location.href = `../Tours/tours.html?điadiem=${encodeURIComponent(diaDiem)}`;
    });
});