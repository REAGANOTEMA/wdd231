Kampala Regional Chamber Directory

A responsive, accessible, and interactive directory of member businesses in the Kampala region. This project was developed as part of the WDD 231 class at BYU-Idaho Online (Pathway).

Table of Contents

Overview

Features

Technologies

Project Structure

Setup

Usage

Author

Overview

This directory allows users to:

Browse and search local businesses in Kampala.

Filter members by membership level: Member, Silver, Gold.

Switch between grid and list views for easy navigation.

Access contact information including email, phone, and location.

The website is designed with accessibility, responsive layout, and clean design in mind.

Features

Responsive Design – Optimized for desktop, tablet, and mobile devices.

Interactive UI – Search, filter, and toggle between grid/list views.

Accessible – Keyboard-friendly navigation, ARIA labels, and screen reader support.

Modern Design – Ribbon header, color accents, hover effects, and clean layout.

Dynamic Rendering – Member cards are generated from a JSON data source.

Technologies

HTML5

CSS3 (with CSS variables for theme colors)

JavaScript (vanilla JS for dynamic rendering and filtering)

Font Awesome icons

Google Fonts (Roboto)

Project Structure
chamber/
│
├── index.html            # Home page
├── directory.html        # Directory page
├── styles/
│   ├── normalize.css     # CSS reset
│   └── chamber.css       # Main styling
├── scripts/
│   └── chamber.js        # JS for dynamic directory
├── images/
│   ├── hero.jpg          # Hero image
│   └── favicon.svg       # Favicon
└── README.md             # Project documentation

Setup

Clone the repository:

git clone https://github.com/yourusername/wdd231-chamber.git


Open directory.html in a browser to view the project.

(Optional) Use a local web server for better functionality, e.g., VS Code Live Server.

Usage

Navigate to the directory page to browse members.

Use the search bar to find businesses by name, address, or phone.

Filter members by membership level using the dropdown.

Switch between grid and list view using the toggle buttons.

Contact businesses directly using the displayed email and phone links.

Author

Reagan Otema – GitHub Profile

BYU-Idaho Online – WDD 231 Class

License

This project is for educational purposes and is not licensed for commercial use.
