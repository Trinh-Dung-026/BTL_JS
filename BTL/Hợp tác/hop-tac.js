const sidebar = document.getElementById('sidebar');
        const openBtn = document.querySelector('.sidebar-toggle');
        const closeBtn = document.querySelector('.close-btn');

        openBtn.addEventListener('click', () =>{
            sidebar.classList.add('active');
        })

        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });

document.getElementById('cooperationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const data = {};
    
    // Handle regular inputs
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    // Handle checkboxes
    const checkboxGroups = ['tourTypes', 'cooperationType'];
    checkboxGroups.forEach(group => {
        const checkboxes = document.querySelectorAll(`input[name="${group}"]:checked`);
        data[group] = Array.from(checkboxes).map(cb => cb.value);
    });
    
    // Validate required fields
    const requiredFields = ['companyName', 'businessLicense', 'companyAddress', 'contactName', 'position', 'email', 'phone', 'popularDestinations'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].length === 0);
    
    if (missingFields.length > 0) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc!');
        return;
    }
    
    // Check if at least one tour type is selected
    if (!data.tourTypes || data.tourTypes.length === 0) {
        alert('Vui lòng chọn ít nhất một loại tour!');
        return;
    }
    
    // Check if at least one cooperation type is selected
    if (!data.cooperationType || data.cooperationType.length === 0) {
        alert('Vui lòng chọn ít nhất một hình thức hợp tác!');
        return;
    }
    
    // Format data for display
    console.log('Thông tin hợp tác được gửi:', data);
    
    // Show success message
    alert('🎉 Cảm ơn bạn đã quan tâm! Chúng tôi sẽ liên hệ lại trong vòng 24h.');
    window.location.href = '../Đăng nhập trước và sau/index.html'; // Redirect to home page after submission
    
    // You can add actual form submission logic here
    // For example, send data to your server:
    // fetch('/api/cooperation', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
});

// Add some interactive effects
document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});