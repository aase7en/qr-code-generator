const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

app.get('/qr', async (req, res) => {
    const { text = '', size = 350 } = req.query;

    if (!text) {
        return res.status(400).send('Missing "text" parameter');
    }

    try {
        res.setHeader('Content-Type', 'image/png');
        await QRCode.toFileStream(res, text, {
            width: parseInt(size),
            margin: 1,
            color: { dark: '#000000', light: '#FFFFFF' }
        });
    } catch (err) {
        res.status(500).send('Error generating QR code');
    }
});

app.listen(port, () => {
    console.log(`QR Code API running on port ${port}`);
});

module.exports = app;
