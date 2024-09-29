const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json({ ip: ip });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
