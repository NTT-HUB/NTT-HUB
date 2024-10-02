const urlParams = new URLSearchParams(window.location.search);
const savehwid = urlParams.get('hwid');

// Kiểm tra nếu hwid tồn tại trong URL thì lưu vào localStorage
if (savehwid) {
    localStorage.setItem('hwid', savehwid);
    console.log('HWID đã được lưu:', savehwid);
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
