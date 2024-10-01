// Lấy URL hiện tại
const urlParams = new URLSearchParams(window.location.search);
const hash = urlParams.get('hash');

const redirectLink = 'ntthub2.html'
// Ghi log giá trị hash
console.log('Hash value:', hash);

// Hàm gửi POST request
function sendPost() {
    if (hash) {
        console.log('Đang gửi POST request...');
        fetch('/api/checkHash?hash=' + hash, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Phản hồi từ server:', data);
            // Đợi 5 giây sau khi nhận phản hồi từ POST
            setTimeout(() => {
                if (data.status === true) {
                    console.log('POST thành công, chuyển hướng...');
               // hwid     
              const hwid = localStorage.getItem('hwid'); // Lấy giá trị hwid từ localStorage

// Kiểm tra nếu hwid tồn tại trong localStorage
if (hwid) {
    console.log('HWID đã được tải:', hwid);
} else {
    console.log('Không tìm thấy HWID trong localStorage');
}
                
                    window.location.href = 'https://link-hub.net/1213408/ntt-hub2';
                } else {
                    console.log('POST không thành công, chuyển về trang mặc định...');
                    // Nếu không thành công, chuyển về trang mặc định
                    window.location.href = 'index.html';
                }
            }, 5000); // Chờ 5 giây
        })
        .catch(error => {
            console.error('Lỗi khi gửi POST request:', error);
            // Chuyển về trang mặc định nếu có lỗi
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 5000); // Chờ 5 giây
        });
    } else {
        console.log('Không tìm thấy hash, chuyển về trang mặc định...');
        // Nếu không có hash, chuyển về trang mặc định
        window.location.href = 'index.html';
    }
}

// Tự động gửi POST sau khi trang tải
window.onload = function() {
    console.log('Trang đã tải, đợi 2 giây trước khi gửi POST...');
    // Đợi 2 giây trước khi gửi POST request
    setTimeout(() => {
        sendPost();
    }, 2000); // Chờ 2 giây
};
