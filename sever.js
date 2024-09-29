const express = require('express');
const app = express();

app.get('/get-ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // Lấy địa chỉ IP
    res.json({ ip: ip }); // Trả về IP trong định dạng JSON
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
