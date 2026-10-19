const express = require('express');
const fs = require('fs');
const path = require('path');
const {validateApplication} = require('./validation');
const app = express();
const PORT = process.env.PORT || 3000;
const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');

fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
    const errors = validateApplication(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const fileName = `application-${Date.now()}.json`;
    const record = { submittedAt: new Date().toISOString(), ...req.body };

    try {
        fs.writeFileSync(path.join(SUBMISSIONS_DIR, fileName), JSON.stringify(record, null, 2));
        res.status(201).json({ success: true, message: 'Application submitted successfully!' });
    } catch (err) {
        console.error('Error saving application:', err);
        res.status(500).json({ success: false, message: 'Failed to save application.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});