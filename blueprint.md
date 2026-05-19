# Lotto & AI Animal Face Test Project Blueprint

## Overview
A multi-functional web application featuring a lottery number generator and an AI-powered animal face classifier (Dog vs. Cat) using Google Teachable Machine.

## Features
- **Lotto Number Generator**: Generates 6 unique numbers (1-45) with range-based color coding.
- **AI Animal Face Test**: Real-time webcam analysis to determine if a face resembles a Dog or a Cat.
- **Dark/Light Mode**: Full theme support with local persistence.
- **Partnership Inquiry**: Formspree-integrated contact form.
- **Community Comments**: Disqus comment system for user interaction.
- **Responsive Design**: Mobile-friendly layout for all tools.

## Technical Details
- **AI Integration**:
  - Google Teachable Machine Image Model.
  - TensorFlow.js for in-browser inference.
  - Webcam integration via `@teachablemachine/image` library.
- **Frontend**: HTML5, CSS3 (Modern Baseline), Vanilla JS.
- **Styling**: 
  - CSS Variables for themes.
  - Custom progress bars for AI results.
  - Flexbox-based vertical layout.
- **State Management**: localStorage for theme settings.
- **Integrations**: 
  - Formspree (Contact Form)
  - Disqus (Comments)

## Current Progress
- [x] Lotto Generator Implementation
- [x] Dark/Light Mode with Persistence
- [x] Partnership Inquiry Form (Formspree)
- [x] Disqus Comment System
- [x] AI Animal Face Test Integration
- [x] UI Styling for AI Results

## Next Steps
- [ ] Add capture/share feature for AI results
- [ ] Implement more animal categories in the AI model
- [ ] Add animations for result transitions
