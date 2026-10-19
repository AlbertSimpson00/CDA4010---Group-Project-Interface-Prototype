# UNFinished Business – Digital Employment Application

A web-based, accessible version of UNFinished Business's paper employment application, built as a course project for **[CDA4010 – User Interface Design]**.

**Team:** Nick Gati, Gavin Pascual, Albert Simpson

## Features

- Sectioned application form with "Add" buttons for references, education, and criminal record entries
- Required-field checks and validation with clear error messages
- Success message on submit; each submission is saved as a JSON file
- Accessibility-focused design (WCAG guidelines)
- Removes questions that may violate employment law (e.g., medical conditions, race, gender, marital status)

## Tech Stack

Node.js · Express · Vue.js · Bootstrap

## Getting Started

Requires [Node.js](https://nodejs.org/) (v18+).

```bash
git clone [https://github.com/AlbertSimpson00/CDA4010---Group-Project-Interface-Prototype]
cd [REPO DESTINATION]
npm install
npm start
```

Then open http://localhost:3000.

## How It Works

The Vue front end validates the form and sends it to an Express endpoint, which saves the submission to `submissions/application-<timestamp>.json`. No database is used.

> `submissions/` is git-ignored so test data (including SSNs) is never committed.

## Project Structure

```
├── server.js       # Express server + submit endpoint
├── public/         # Vue app, HTML, CSS
├── submissions/    # Saved applications (git-ignored)
└── docs/           # Development Report & User Manual
```

## Changes from Proposal

Track any changes from the approved Interface Proposal here (needed for the Development Report).

| Date | Change | Reason |
|------|--------|--------|
| N/A  |  N/A   |  N/A   |
