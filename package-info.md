# Dependency Notes

CampusConnect has no build step and no npm dependencies. Libraries load from the official jQuery CDN:

| Library | Version | Status |
|---|---|---|
| jQuery Core | 1.11.1 | Legacy (2014). Has known published vulnerabilities (e.g. XSS issues fixed in jQuery 3.x). |
| jQuery Mobile | 1.4.5 | Legacy (2014). Project is no longer actively maintained. |

These versions are required by the academic assignment. Do not use them for production software handling real user data. The MIT license covers only the original project code, not these libraries.
