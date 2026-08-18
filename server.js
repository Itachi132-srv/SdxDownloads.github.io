const express = require('express');
const path = require('path');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. Analyze Endpoint
app.post('/api/analyze', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, message: 'Please provide a valid video URL.' });
    }

    // Mock metadata response for the preview card
    res.json({
        success: true,
        title: 'Public Domain Sample Video',
        duration: '00:15',
        formats: ['MP4 (Video)', 'MP3 (Audio)'],
        qualities: ['1080p Full HD', '720p HD', '480p SD']
    });
});

// 2. Real Download Endpoint
app.get('/api/download', (req, res) => {
    // Safe public domain test video URL (W3Schools sample MP4)
    const sampleVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

    // Set headers to force browser download
    res.setHeader('Content-Disposition', 'attachment; filename="SdxDownload_Video.mp4"');
    res.setHeader('Content-Type', 'video/mp4');

    // Stream the file directly to the user's device securely without storing local malware
    https.get(sampleVideoUrl, (externalRes) => {
        externalRes.pipe(res);
    }).on('error', (err) => {
        console.error(err);
        res.status(500).send('Download failed.');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
