const http = require('http');

const requestListener = function (req, res) {
    // Lấy địa chỉ IP của người dùng
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Trả về IP dưới dạng JSON
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ ip: ip }));
};

const server = http.createServer(requestListener);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
