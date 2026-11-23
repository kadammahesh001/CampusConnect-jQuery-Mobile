# CampusConnect: Mobile Student Information & Campus Portal

![jQuery Mobile](https://img.shields.io/badge/jQuery%20Mobile-1.4.5-orange) ![jQuery](https://img.shields.io/badge/jQuery-1.11.1-blue) ![HTML5](https://img.shields.io/badge/HTML5-CSS3-green)

Assignment 6, jQuery Mobile, Full Stack Web Technology Laboratory. Live Demo: Not deployed yet.

> This project was developed as an academic implementation of Assignment 6 — jQuery Mobile. Sample campus information and demonstration records are provided for educational purposes.

## Contents
[Overview](#overview) | [Features](#features) | [Stack](#technology-stack) | [Structure](#folder-structure) | [Run](#run-locally) | [Validation & storage](#validation-and-localstorage) | [Testing](#testing) | [Screenshots](#screenshots) | [Limitations](#limitations) | [Future scope](#future-scope) | [Author](#author)

## Overview
Assignment statement: *"Create a simple Mobile Website using jQuery Mobile."* CampusConnect is a single-document, nine-page jQuery Mobile app: `#home`, `#announcements`, `#subjects`, `#subject-details`, `#events`, `#faculty`, `#feedback`, `#about`, `#contact`.

## Features
- Dashboard with two-column quick access grid, stats and previews
- Six sample announcements with priority badges and detail popup
- Seven subjects with live `data-filter` search, empty state, and dynamic syllabus page (`ds, dbms, wt, jp, cn, dw, os`)
- Eight events with category filtering (`fadeIn`/`fadeOut`) and demo registration popup
- Six fictional faculty records, filterable, with popup and demo inquiry form
- Feedback form with a JavaScript validation engine and LocalStorage history
- Slide-out panel (unique ID per page), bottom navbar, responsive layout

## Technology Stack
HTML5, CSS3, JavaScript, jQuery 1.11.1, jQuery Mobile 1.4.5 (official CDN), LocalStorage. **These are legacy, unmaintained versions with known security limitations** required by the assignment; see [package-info.md](package-info.md).

## Folder Structure
```
CampusConnect-jQuery-Mobile/
├── index.html
├── css/style.css
├── js/script.js        (app logic)
├── js/mobileinit.js    (jQM default transition)
├── images/ (logo.svg, favicon.svg, screenshots/)
├── docs/LAB_REPORT.md
├── README.md  LICENSE  .gitignore  package-info.md
```

## Run Locally
Requires Python 3 and internet access (the libraries load from the CDN). On Windows:
```
cd CampusConnect-jQuery-Mobile
python -m http.server 8085
```
Open http://localhost:8085

## Validation and LocalStorage
`validateAndSubmitFeedback()` checks: name (required, 2+ chars), email (required, `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), department, year, rating, category, comments (5+ chars). Errors appear in `#feedbackErrorBox`, fields are highlighted, and invalid data is never saved. Valid records get a unique ID and timestamp, are stored under key `campusconnect_feedbacks`, and the form resets. JSON parse and storage errors are handled. All user text is passed through `escapeHtml` before rendering. LocalStorage is per-browser, not cloud storage; do not enter sensitive data.

## Testing
See [docs/LAB_REPORT.md](docs/LAB_REPORT.md) for what was actually run and what remains manual. No browser-based tests have been recorded yet.

## Screenshots
None included yet. Run the app, open each page, and save captures into `images/screenshots/`, then link them here.

## Limitations
Legacy dependencies; CDN required (no offline mode); all data is sample/demo; no backend; feedback lives only in one browser.

## Future Scope
Offline vendored libraries, backend API, migration to a maintained framework, automated browser tests.

## Author
Mahesh Kadam, B.Tech Data Science, MIT Academy of Engineering, Alandi, Pune (2026). Code is MIT licensed; third-party libraries keep their own licenses.
