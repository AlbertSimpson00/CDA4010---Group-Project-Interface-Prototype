const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');

fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });

// Keep the uploaded file in memory so we can name it after the application ID
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Resume must be a PDF.'));
    }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function toLines(value, prefix = '') {
    if (Array.isArray(value)) {
        if (value.length === 0) return [`${prefix}: (none)`];
        return value.flatMap((item, i) => toLines(item, `${prefix}[${i}]`));
    }
    if (value !== null && typeof value === 'object') {
        return Object.entries(value).flatMap(([key, v]) =>
            toLines(v, prefix ? `${prefix}.${key}` : key)
        );
    }
    return [`${prefix}: ${value === null || value === undefined ? '' : value}`];
}

app.post('/submit', upload.single('resume'), (req, res) => {
    const id = Date.now();
    const submittedAt = new Date().toISOString();
    const textName = `application-${id}.txt`;
    const resumeName = req.file ? `application-${id}-resume.pdf` : null;

    let data = {};
    try {
        data = JSON.parse(req.body.application || '{}');
    } catch {
        return res.status(400).json({ success: false, message: 'Invalid application data.' });
    }

    const text = [
        'UNFinished Business - Employment Application',
        `Application ID: ${id}`,
        `Submitted: ${submittedAt}`,
        `Resume file: ${resumeName || '(none)'}`,
        '',
        ...toLines(data),
        ''
    ].join('\n');

    try {
        if (req.file) {
            fs.writeFileSync(path.join(SUBMISSIONS_DIR, resumeName), req.file.buffer);
        }
        fs.writeFileSync(path.join(SUBMISSIONS_DIR, textName), text);
        res.status(201).json({ success: true, id, message: 'Application submitted successfully!' });
    } catch (err) {
        console.error('Error saving application:', err);
        res.status(500).json({ success: false, message: 'Failed to save application.' });
    }
});

// Turns upload errors (wrong type, too big) into a JSON message the frontend can show
app.use((err, req, res, next) => {
    res.status(400).json({ success: false, message: err.message || 'Upload failed.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});