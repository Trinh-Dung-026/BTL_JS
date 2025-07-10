const sidebar = document.getElementById('sidebar');
const openBtn = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () =>{
    sidebar.classList.add('active');
    })

closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
