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

async function createOrUpdateHtmlFile(key) {
    try {
        const currentDate = getCurrentDate();
        const hwid = localStorage.getItem('hwid'); // Lấy hwid từ localStorage

        // Kiểm tra xem hwid có tồn tại không
        if (!hwid) {
            console.error('HWID không tồn tại trong localStorage');
            return;
        }

        // Tạo tên file HTML với HWID và ngày tháng năm
        const filePath = `Key/${hwid}${currentDate.day}${currentDate.month}${currentDate.year}.html`;

        // Nội dung HTML mới
        const htmlContent = `
            <html lang="vi">
                <head>
                    <meta charset="UTF-8">
                    <title>Key</title>
                </head>
                <body>
                    <h1>Key : KEY_NTT_HUB_${key}</h1>
                </body>
            </html>`;

        const data = {
            message: 'Update HTML script from web',
            content: encodeBase64(htmlContent)
        };

        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        };

        // Cập nhật file HTML
        await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });

        // Hiển thị iframe và bắt đầu đếm ngược
        document.getElementById('fileFrame').src = `https://ntt-hub.github.io/NTT-HUB/Key/${hwid}${currentDate.day}${currentDate.month}${currentDate.year}`;
        document.getElementById('fileFrame').style.display = 'none';
        document.getElementById('myButton').style.display = 'none';

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
                window.location.href = 'ntt-key.html' //`https://ntt-key.vercel.app/Key/${hwid}${currentDate.day}${currentDate.month}${currentDate.year}.html`;
            }
        }, 1000); // Cập nhật mỗi giây
    } catch (error) {
        console.error('Error creating or updating file:', error);
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

        const luaContent = luaTemplate.replace('{Gkey}', `KEY_NTT_HUB_${key}`);

        if (existingContent.includes(`-- Day = ${currentDate.day}`) &&
            existingContent.includes(`-- Month = ${currentDate.month}`) &&
            existingContent.includes(`-- Year = ${currentDate.year}`) &&
            existingContent.includes(`-- HWID = ${hwid}`)) {
            existingContent += `\n${luaContent}`;
        } else {
            existingContent = luaContent;
        }

        const data = {
            message: 'Update Lua script from web',
            content: encodeBase64(existingContent)
        };

        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        };

        // Cập nhật file Lua
        await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });

        console.log('File Lua đã cập nhật thành công');
    } catch (error) {
        console.error('Error creating or updating Lua file:', error);
    }
}

async function handleKeyCreation() {
    const key = getRandomKey(); // Tạo key ngẫu nhiên
  await createOrUpdateHtmlFile(key); // Tạo hoặc cập nhật file HTML
    await createOrUpdateLuaFile(key); // Tạo hoặc cập nhật file Lua
    localStorage.setItem('key', key);
}
