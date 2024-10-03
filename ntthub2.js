let c1 = "ghp_z0c2mIDxkne";
let c2 = "llVUHSyouap";
let c3 = "EFPofFhf1G15EW";
let c4 = c1 + c2 + c3;

const token = c4; // Thay thế bằng token mới
const repoOwner = 'NTT-KEY'; // Đảm bảo giá trị này chính xác
const repoName = 'NTT-KEY'; // Đảm bảo giá trị này chính xác
const luaTemplate = `_G.index_key="{Gkey}"`;

function encodeBase64(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    let binary = '';
    const len = data.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(data[i]);
    }
    return btoa(binary);
}

function getCurrentDate() {
    const today = new Date();
    return {
        day: today.getDate(),
        month: today.getMonth() + 1, // Tháng tính từ 0, nên cần cộng thêm 1
        year: today.getFullYear()
    };
}

function getRandomKey() {
    return Math.random().toString().slice(2, 12); // Tạo một chuỗi số ngẫu nhiên 10 ký tự
}

async function getFileContent(filePath) {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    const response = await fetch(url, { headers });
    if (response.ok) {
        const data = await response.json();
        return atob(data.content); // Giải mã nội dung Base64
    } else if (response.status === 404) {
        return ''; // File chưa tồn tại
    } else {
        throw new Error('Error fetching file content');
    }
}



async function loadtime(key) {
    try {
        const currentDate = getCurrentDate();
        const hwid = localStorage.getItem('hwid'); // Lấy hwid từ localStorage

        // Kiểm tra xem hwid có tồn tại không
        if (!hwid) {
            console.error('HWID không tồn tại trong localStorage');
            return;
        }

        // Bỏ phần tạo file HTML và cập nhật GitHub

        // Phần đếm ngược
        let countdown = 3;
        const keyTitle = document.getElementById('keyTitle');
        keyTitle.style.display = 'block'; // Hiển thị phần tử 'keyTitle'
        keyTitle.textContent = `Wait : ${countdown}`;

        // Bắt đầu đếm ngược
        const interval = setInterval(() => {
            countdown--;
            keyTitle.textContent = `Wait : ${countdown}`;

            // Khi đếm ngược về 0, dừng đếm và chuyển hướng
            if (countdown === 0) {
                clearInterval(interval);
                window.location.href = 'ntt-key.html'; // Điều hướng sau khi hết thời gian
            }
        }, 1000); // Cập nhật mỗi giây
    } catch (error) {
        console.error('Error during countdown:', error);
    }
}



async function createOrUpdateLuaFile(key) {
    try {
        const currentDate = getCurrentDate();
        const hwid = localStorage.getItem('hwid'); // Lấy hwid từ localStorage

        // Kiểm tra xem hwid có tồn tại không
        if (!hwid) {
            console.error('HWID không tồn tại trong localStorage');
            return;
        }

        // Tạo tên file Lua với HWID và ngày tháng năm
        const filePath = `Key/${hwid}${currentDate.day}${currentDate.month}${currentDate.year}.lua`;
        let existingContent = await getFileContent(filePath);
        
        // Nội dung của Lua file, thay thế {Gkey} bằng key được truyền vào
        const luaContent = luaTemplate.replace('{Gkey}', `KEY_NTT_HUB_${key}`);

        // Kiểm tra nội dung file hiện tại nếu tồn tại
        if (existingContent) {
            if (existingContent.includes(`-- Day = ${currentDate.day}`) &&
                existingContent.includes(`-- Month = ${currentDate.month}`) &&
                existingContent.includes(`-- Year = ${currentDate.year}`) &&
                existingContent.includes(`-- HWID = ${hwid}`)) {
                // Nếu nội dung đã khớp, thêm nội dung mới
                existingContent += `\n${luaContent}`;
            } else {
                // Nếu không khớp, thay thế toàn bộ nội dung
                existingContent = luaContent;
            }
        } else {
            // Nếu file không tồn tại, tạo nội dung mới
            existingContent = luaContent;
        }

        const data = {
            message: 'Update Lua script from web',
            content: encodeBase64(existingContent)
        };

        // Tạo URL cho API GitHub
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        };

        // Kiểm tra file có tồn tại không để lấy SHA nếu cần cập nhật
        const fileResponse = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        // Lấy sha nếu file đã tồn tại
        if (fileResponse.ok) {
            const fileData = await fileResponse.json();
            data.sha = fileData.sha; // Thêm SHA vào dữ liệu nếu file tồn tại
        }

        // Cập nhật hoặc tạo mới file Lua
        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (updateResponse.ok) {
            console.log('File Lua đã cập nhật thành công');
        } else {
            const errorData = await updateResponse.json();
            console.error('Error updating file:', errorData);
        }
    } catch (error) {
        console.error('Error creating or updating Lua file:', error);
    }
}



async function handleKeyCreation() {
    const key = getRandomKey(); // Tạo key ngẫu nhiên
    await loadtime(key); // Tạo hoặc cập nhật file HTML
    await createOrUpdateLuaFile(key); // Tạo hoặc cập nhật file Lua
    localStorage.setItem('key', key);
}
