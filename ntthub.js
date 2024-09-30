// Lấy giá trị hwid từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const hwid = urlParams.get('hwid');

        // Kiểm tra nếu hwid tồn tại trong URL thì lưu vào localStorage và hiển thị thông báo
        if (hwid) {
            localStorage.setItem('hwid', hwid);
            alert('HWID đã được lưu: ' + hwid);  // Hiển thị thông báo khi HWID được lưu
            console.log('HWID đã được lưu:', hwid);
        } else {
            console.log('Không tìm thấy HWID trong URL');
        }

function buttonClicked1() {
            // Thay đổi URL đến trang bạn muốn chuyển hướng
            window.location.href = 'https://direct-link.net/1213408/ntt-hub1';
        }
function buttonClicked2() {
            // Thay đổi URL đến trang bạn muốn chuyển hướng
            window.location.href = 'https://discord.com/invite/P44exUDArv';
    
        }
function donate() {
    //test web donate
alert('test')
}
