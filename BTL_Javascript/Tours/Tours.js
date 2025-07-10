const sidebar = document.getElementById('sidebar');
const openBtn = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () =>{
    sidebar.classList.add('active');
})

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

//Javascript cho Price Range Slider
const minRange = document.querySelector('.min-range');
const maxRange = document.querySelector('.max-range');
const minPriceDisplay = document.getElementById('min-price-display');
const maxPriceDisplay = document.getElementById('max-price-display');
const sliderTrack = document.querySelector('.price-filter .slider-track');

function updateSlider() {
    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);
    const min = parseInt(minRange.min);
    const max = parseInt(minRange.max);
    const totalRange = max - min;

    //Đảm bảo giá trị Min không lớn hơn giá trị Max
    if (minVal > maxVal) {
        let temp = minVal;
        minVal = maxVal;
        maxVal = temp;
        minRange.value = minVal;
        maxRange.value = maxVal;
    }

    //Cập nhập nội dung số
    minPriceDisplay.textContent = minVal;
    maxPriceDisplay.textContent = maxVal;

    //Tính toán phần trăm vị trí của mỗi thumb trên track (cho cả thanh màu xanh và vị trí của ô hiển thị giá)
    const minPercent = ((minVal - min) / totalRange) * 100;
    const maxPercent = ((maxVal - min) / totalRange) * 100;

    //Áp dụng background cho phần track được chọn
    sliderTrack.style.background = `linear-gradient(to right, #ddd ${minPercent}%, #4CAF50 ${minPercent}%, #4CAF50 ${maxPercent}%, #ddd ${maxPercent}%)`;

    //Cập nhập vị trí của các ô hiển thị giá
    //Lấy chiều rộng của thanh trượt để tính toán pixel
    const sliderWidth = minRange.offsetWidth; //Chiều rộng thực tế của input range

    //Tính toán vị trí pixel của min thumb
    const minThumbPos = ((minVal - min) / totalRange) * sliderWidth;
    const maxThumbPos = ((maxVal - min) / totalRange) * sliderWidth;

    //Lấy chiều rộng của ô hiển thị giá để căn chỉnh
    const minDisplayWidth = minPriceDisplay.offsetWidth;
    const maxDisplayWidth = maxPriceDisplay.offsetWidth;

    //Điều chỉnh vị trí của ô min-price-display
    //Căn giữa ô với thumb: trừ đi một nửa chiều rộng của ô
    //Giới hạn để ô không đi quá mép trái
    let calculatedMinLeft = minThumbPos - (minDisplayWidth / 2);
    minPriceDisplay.style.left =`${Math.max(0, calculatedMinLeft)}px`; //Không nhỏ hơn 0
    minPriceDisplay.style.transform = 'translateX(0)'; //Reset transform nếu có

    //Điều chỉnh vị trí của ô max-price-display
    //Căn giữa ô với thumb: trừ đi một nửa chiều rộng của ô
    //Giới hạn để ô không đi quá mép phải
    let calculatedMaxLeft = maxThumbPos - (maxDisplayWidth / 2);
    maxPriceDisplay.style.left = `${Math.min(sliderWidth - maxDisplayWidth, calculatedMaxLeft)}px` //Không lớn hơn (sliderWidth - maxDisplayWidth)
    maxPriceDisplay.style.transform = 'translateX(0)'; //Reset transform nếu có

    //Để giá trị không chồng chéo lên nhau khi gần nhau
    //Kiểm tra và điều chỉnh vị trí của minPriceDisplay nếu nó gần maxPriceDisplay
    const gapThreshold = 20; //Khoảng cách tối thiểu giữa hai ô
    const currentMinRight = calculatedMinLeft + minDisplayWidth;
    if (currentMinRight + gapThreshold > calculatedMaxLeft) {
        //Nếu chúng quá gần, đẩy minPriceDisplay sang trái hoặc maxPriceDisplay sang phải
        minPriceDisplay.style.left = `${calculatedMaxLeft - minDisplayWidth - gapThreshold}px`;
        //Đảm bảo không đi quá mép trái
        minPriceDisplay.style.left = `${Math.max(0, parseInt(minPriceDisplay.style.left))}px`;
    }
    //Đảm bảo ô giá trị nằm trên thanh trượt, không bị ẩn
    minPriceDisplay.style.top = `-30px`;
    maxPriceDisplay.style.top = `-30px`;
}

//Gắn sự kiện lắng nghe
minRange.addEventListener('input', updateSlider);
maxRange.addEventListener('input', updateSlider);

//Gọi hàm updateSlider lần đầu khi trang tải để thiết lập trạng thái ban đầu
updateSlider();

//Cập nhập lại vị trí khi kích thước cửa sổ thay đổi (để sliderWidth đúng)
window.addEventListener('resize', updateSlider);


//Phần lọc dữ liệu
document.addEventListener("DOMContentLoaded", function(){
    //Lấy tất cả checkbox
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const  tourCards = document.querySelectorAll('.tour-card');

    //Lấy input thanh trượt giá
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');

    //Gán sự kiện khi người dùng thay đổi các checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterTours);
    })

    //Cập nhập giá hiển thị khi người dùng kéo thanh giá
    minRange.addEventListener('input', () => {
        document.getElementById('min-price-display').innerText = minRange.value;
        filterTours();
    })

    maxRange.addEventListener('input', () => {
        document.getElementById('max-price-display').innerText = maxRange.value;
        filterTours();
    })

    //Hàm lấy các giá trị đã chọn từ checkbox theo tên
    function getCheckedValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
    }

    //Hàm chính để lọc các tour
    function filterTours() {
        //Lưu các lựa chọn lọc từ người dùng
        const filters = {
            Destination: getCheckedValues('Destination'),
            Duration: getCheckedValues('Duration'),
            NumberOfPeople: getCheckedValues('NumberOfPeople'),
            Type: getCheckedValues('Type')
        }

        //Giá trị tối thiểu và tối đa từ thanh trượt giá vé
        const minPrice = parseInt(minRange.value);
        const maxPrice = parseInt(maxRange.value);

        //Duyệt qua tất cả các tour để kiểm tra điều kiện
        tourCards.forEach(card => {
            const cardPrice = parseInt(card.dataset.price);     //Giá tour
            const cardTypes = card.dataset.type.split(',');     //Tách các loại vé (nếu nhiều)

            //Kiểm tra từng điều kiện lọc
            const matchDestination = filters.Destination.length ===0 || filters.Destination.includes(card.dataset.destination);
            const matchDuration = filters.Duration.length === 0 || filters.Duration.includes(card.dataset.duration);
            const matchType = filters.Type.length === 0 || filters.Type.some(type => cardTypes.includes(type));
            const matchPeople = filters.NumberOfPeople.length === 0 || filters.NumberOfPeople.includes(card.dataset.people);
            const matchPrice = cardPrice >= minPrice && cardPrice <= maxPrice;

            //Nếu tour thỏa mãn tất cả các điều kiện -> hiển thị
            if (matchDestination && matchDestination && matchPeople && matchType && matchPrice) {
                card.style.display = "block";
            }
            else {
                card.style.display = "none";
            }
        })
    }
    //Nút xóa lọc
    const resetBtn = document.getElementById("reset-filters");

    resetBtn.addEventListener("click", () => {
        //Bỏ chọn tất cả checkBox
        checkboxes.forEach(cb => cb.checked = false);

        //Reset thanh trượt về mặc định
        minRange.value = 0;
        maxRange.value = 500;
        document.getElementById('min-price-display').innerText = minRange.value;
        document.getElementById('max-price-display').innerText = maxRange.value;

        //Hiển thị lại toàn bộ tour
        filterTours();
    })

    // Hiển thị tour từ trang chủ
    const params = new URLSearchParams(window.location.search);
    const tourParam = params.get("tour");

    if (tourParam) {
        // Map cacs gias trij URL với tiêu đề tour
        const tourMap = {
            vinh_ha_long: "Vịnh Hạ Long",
            sunworld: "SunWorld Hạ Long Park",
            trang_an: "Tràng An",
            tam_coc: "Tam Cốc - Bích Đồng",
            pu_luong: "Khu bảo tồn thiên nhiên Pù Luông",
            thanh_nha_ho: "Thành Nhà Hồ",
            xuan_son: "Vườn Quốc Gia Xuân Sơn",
            ao_gioi: "Ao Giời - Suối Tiên"
        };

        const targetTitle = tourMap[tourParam];

        if (targetTitle) {
            tourCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent?.trim();
                if (title === targetTitle) {
                    card.scrollIntoView({behavior: 'smooth', block: 'center'});
                    card.classList.add('highlight-tour');
                }
                else {
                    card.style.display = "none";
                }
            })
        }
    }
})
