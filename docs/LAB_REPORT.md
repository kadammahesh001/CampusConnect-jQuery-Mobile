# Lab Report: CampusConnect (Assignment 6, jQuery Mobile)

Mahesh Kadam | B.Tech Data Science | MIT Academy of Engineering, Alandi, Pune | Full Stack Web Technology Laboratory | 2026

> Note: this report was written from the project brief. The original 15-page PDF was not available during the build, so it should be reconciled with that PDF before submission.

## 1. Assignment Statement
Create a simple Mobile Website using jQuery Mobile.

## 2. Abstract
CampusConnect is a nine-page mobile student portal using jQuery Mobile's single-document multi-page model, with dynamic content, validated forms and LocalStorage persistence.

## 3. Introduction
Mobile-first web apps need touch-friendly navigation and consistent widgets; jQuery Mobile supplies these on top of jQuery.

## 4. Objectives
Use `data-role` pages, panels, navbars, popups, filterable listviews; validate forms in JavaScript; persist data with LocalStorage.

## 5. Problem Definition
Students need one mobile place for notices, subjects, events, faculty contacts and feedback.

## 6. Proposed Solution & Architecture
```mermaid
flowchart LR
  index.html --> style.css
  index.html --> script.js
  script.js --> Data[(JS data)]
  script.js --> LS[(LocalStorage)]
```

## 7. Actual Technology Stack
HTML5, CSS3, JavaScript, jQuery 1.11.1, jQuery Mobile 1.4.5, LocalStorage, Python `http.server`.

## 8. System Requirements
Modern browser, Python 3, internet access for CDN.

## 9. Introduction to jQuery Mobile
A touch-optimised UI framework (v1.4.5, 2014) that enhances markup via `data-*` attributes. It is no longer actively maintained.

## 10. Page Architecture
| Page ID | Purpose |
|---|---|
| home, announcements, subjects, subject-details, events, faculty, feedback, about, contact | Nine `data-role="page"` sections in `index.html` |

## 11. Directory Structure
See README.md.

## 12. UI/UX Design System
Navy `#1E3A8A`, royal blue `#2563EB`, sky `#0284C7`, emerald `#059669`, rose `#E11D48`, amber `#D97706`, background `#F8FAFC`; Inter/system font stack; rounded cards.

## 13. Implementation Details
| Component | Element / function |
|---|---|
| Panels | `#panel-<page>` |
| Subject detail | `#detailTitle`, `#detailCode`, `#detailCredits`, `#detailDesc`, `#detailUnitsList` |
| Validation | `validateAndSubmitFeedback()`, `#feedbackErrorBox`, `#feedbackErrorList` |
| Storage | `saveFeedbackToStorage()`, `loadSavedFeedbacksFromStorage()`, key `campusconnect_feedbacks` |

## 14. Source Code Analysis
`script.js` is an IIFE: data dictionaries, rendering on `pagebeforecreate`, delegated click handlers bound once on `document`, validation, storage, and the `esc()` HTML escaper.

## 15. Testing & Verification
**Executed:** `node --check js/script.js` (syntax OK); scripted check of `index.html` for duplicate IDs (none) and unresolved internal `#` links (none); nine `data-role="page"` blocks counted.
**Not yet executed (manual, in a browser):**
| Test | Status |
|---|---|
| jQM initialisation, no console errors | Not run |
| Navigation via panel and navbar | Not run |
| Subject filter and empty state | Not run |
| Subject detail changes per subject | Not run |
| Event category filter | Not run |
| Faculty popup | Not run |
| Invalid email rejected; valid submit saved; persists after reload | Not run |
| Layouts at 360, 390, 768, 1366 px | Not run |

## 16. Implementation Proof
No screenshots captured yet (see README).

## 17. Results & Discussion
Static checks passed; behaviour in a browser remains to be verified.

## 18. Advantages
No build step, simple structure, accessible form feedback, escaped user input.

## 19. Limitations
Legacy libraries, CDN dependency, sample data, browser-only storage.

## 20. Future Scope
Vendored assets, backend, modern framework migration, automated tests.

## 21. Conclusion
The project meets the assignment's structure; final verification needs a browser run.

## 22. References
jQuery Mobile 1.4.5 docs (api.jquerymobile.com); jQuery 1.11 API docs; MDN Web Storage API.
