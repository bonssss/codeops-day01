# Module 2 Day 2 Exercises

This directory contains the solutions for the Module 2 Day 2 HTML exercises. 

## Overview
The `index.html` file showcases several core HTML concepts including forms, tables, media elements, accessibility best practices, and W3C validation compliance.

## Exercises Completed

1. **Ethio Telecom Registration Form**
   - Implemented a complete registration form using the `POST` method for secure data submission.
   - Includes inputs for Name, Email, Password, Branch selection, and Phone Number.
   - The phone number input (`type="tel"`) is validated with a regular expression pattern (`\+251\d{9}`) to accept only numbers starting with `+251` followed by 9 digits.
   - All form controls are properly associated with `<label>` tags.

2. **Ethiopian Airlines Flight Table**
   - Created a structured data table displaying 5 rows of flight schedules.
   - Includes proper semantic tags: `<thead>`, `<tbody>`, and a `<caption>`.
   - Used `scope="col"` on table headers to improve accessibility for screen readers.

3. **Media Block**
   - Integrated an image wrapped inside a `<figure>` element with a descriptive `<figcaption>`.
   - Embedded a Google Maps `<iframe>` for Bole International Airport.

4. **Accessibility Fixes**
   - Demonstrated "before and after" examples of inaccessible vs. accessible HTML elements.
   - Replaced an inaccessible `<div>` button with a native, focusable `<button>`.
   - Added proper `<label>` elements to unlabelled form inputs.
   - Provided meaningful `alt` text to images to support screen readers.

5. **W3C Validation & Head Tags**
   - The document includes a fully structured `<head>` with a unique title, meta description, charset, and viewport configuration.
   - The HTML structure has been adjusted to pass W3C validation.
