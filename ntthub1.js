// Lấy URL hiện tại
const urlParams = new URLSearchParams(window.location.search);
const hash = urlParams.get('hash');
// Lấy ngày hiện tại
const day = new Date().getDate();

// Danh sách các link theo ngày
const linkMap = {
    1: "https://direct-link.net/1213408/kkk1",
    2: "https://link-target.net/1213408/kkk2",
    3: "https://link-center.net/1213408/kkk3",
    4: "https://link-target.net/1213408/kkk4",
    5: "https://link-center.net/1213408/kkk5",
    6: "https://link-target.net/1213408/kkk6",
    7: "https://link-target.net/1213408/kkk7",
    8: "https://link-target.net/1213408/kkk8",
    9: "https://link-target.net/1213408/kkk9",
    10: "https://direct-link.net/1213408/kkk10",
    11: "https://link-center.net/1213408/kkk11",
    12: "https://link-center.net/1213408/kkk12",
    13: "https://direct-link.net/1213408/kkk13",
    14: "https://link-hub.net/1213408/kkk14",
    15: "https://link-target.net/1213408/kkk15",
    16: "https://link-hub.net/1213408/kkk16",
    17: "https://link-hub.net/1213408/kkk17",
    18: "https://link-center.net/1213408/kkk18",
    19: "https://link-target.net/1213408/kkk19",
    20: "https://direct-link.net/1213408/kkk20",
    21: "https://direct-link.net/1213408/kkk21",
    22: "https://link-hub.net/1213408/kkk22",
    23: "https://direct-link.net/1213408/kkk23",
    24: "https://link-hub.net/1213408/kkk24",
    25: "https://direct-link.net/1213408/kkk25",
    26: "https://link-center.net/1213408/kkk26",
    27: "https://link-hub.net/1213408/kkk27",
    28: "https://link-target.net/1213408/kkk28",
    29: "https://link-target.net/1213408/kkk29",
    30: "https://link-hub.net/1213408/kkk30",
    31: "https://direct-link.net/1213408/kkk31"
};

// Lấy link theo ngày, nếu không có thì chuyển hướng mặc định
const redirectLink = linkMap[day]
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
                    // Nếu thành công, chuyển tới link của ngày 1
                    window.location.href = redirectLink;
                } else {
                    console.log('POST không thành công, chuyển về trang mặc định...');
                    // Nếu không thành công, chuyển về trang mặc định
                    window.location.href = 'https://ntt-hub.github.io/NTT-WEB/';
                }
            }, 5000); // Chờ 5 giây
        })
        .catch(error => {
            console.error('Lỗi khi gửi POST request:', error);
            // Chuyển về trang mặc định nếu có lỗi
            setTimeout(() => {
                window.location.href = 'https://ntt-hub.github.io/NTT-WEB/';
            }, 5000); // Chờ 5 giây
        });
    } else {
        console.log('Không tìm thấy hash, chuyển về trang mặc định...');
        // Nếu không có hash, chuyển về trang mặc định
        window.location.href = 'https://ntt-hub.github.io/NTT-WEB/';
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
