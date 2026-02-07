# Web Calculator

A high-fidelity, static-web implementation of the Microsoft Windows Calculator,
built using only HTML, CSS, and Vanilla JavaScript.

## Features

- Standard, Scientific, Programmer modes
- Windows-style calculation chaining
- Correct Windows % behavior
- Memory functions (MC, MR, M+, M−, MS)
- Keyboard-friendly interaction
- Session-persistent calculation history
- AMOLED-true black UI
- No frameworks, no build step

## How to Run Locally

1. Clone the repository
2. Open `index.html` in any modern browser

## GitHub Pages Deployment

1. Push repository to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/root`
4. Save — site goes live instantly

## Notes

Perfect parity with native Windows Calculator is constrained by:
- JavaScript floating-point arithmetic
- Browser font rendering differences

Closest technically accurate equivalents are used.
