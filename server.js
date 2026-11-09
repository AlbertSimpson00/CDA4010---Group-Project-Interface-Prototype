const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');

fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Turns the nested form data into readable lines, e.g.
//   personalInfo.firstName: Ana
//   references[0].phone: 407-555-1234
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

// No validation for now: whatever the form sends is saved as-is.
app.post('/submit', (req, res) => {
    const submittedAt = new Date().toISOString();
    const fileName = `application-${Date.now()}.txt`;

    const text = [
        'UNFinished Business - Employment Application',
        `Submitted: ${submittedAt}`,
        '',
        ...toLines(req.body || {}),
        ''
    ].join('\n');

    try {
        fs.writeFileSync(path.join(SUBMISSIONS_DIR, fileName), text);
        res.status(201).json({ success: true, message: 'Application submitted successfully!' });
    } catch (err) {
        console.error('Error saving application:', err);
        res.status(500).json({ success: false, message: 'Failed to save application.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});