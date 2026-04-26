# FridayAI Marketing Website

A modern, responsive marketing website for FridayAI - a voice-first AI assistant with live audio interaction, emotion detection, and session memory.

## Features

- **Modern Design**: Dark theme with cyan accents, optimized for readability and engagement
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle animations and transitions for enhanced user experience
- **Performance Optimized**: Fast loading times with optimized CSS and JavaScript
- **SEO Friendly**: Semantic HTML structure for better search engine visibility
- **Accessibility**: WCAG compliant design with proper contrast ratios and semantic elements

## Project Structure

```
fridayai-website/
├── index.html          # Main HTML file with page structure
├── styles.css          # Complete styling with animations
├── script.js           # Interactive features and smooth scrolling
└── README.md          # This file
```

## Sections

### 1. Navigation Bar
- Sticky navigation with smooth scrolling links
- Logo and brand name
- Call-to-action button
- Responsive design for mobile devices

### 2. Hero Section
- Eye-catching headline and description
- Animated microphone visualization
- Primary and secondary call-to-action buttons
- Gradient background effects

### 3. Features Section
- 6 key features showcased in a grid layout
- Feature cards with hover effects
- Icons and descriptions for each feature
- Responsive grid that adapts to screen size

### 4. How It Works Section
- 3-step process explanation
- Visual step indicators
- Clear descriptions of each step
- Arrow indicators for flow (desktop only)

### 5. Capabilities Section
- 6 key capabilities with checkmarks
- Detailed descriptions
- Hover effects for interactivity
- Organized in a grid layout

### 6. Tech Stack Section
- Technologies powering FridayAI
- Google Gemini 2.5 Flash
- Claude AI
- Web Audio API
- Real-time processing

### 7. Call-to-Action Section
- Strong headline
- Description of value proposition
- Primary and secondary buttons
- Gradient background

### 8. Footer
- Quick links and navigation
- Legal links
- Copyright information
- Organized footer sections

## Color Scheme

- **Primary Color**: Cyan (#00D9FF)
- **Background**: Dark Navy (#0A0E27)
- **Surface**: Charcoal (#1A1F3A)
- **Text Light**: Off-white (#E8E8E8)
- **Text Muted**: Medium Gray (#8A8A8A)
- **Border**: Dark Blue (#2A3050)

## Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## CSS Features

- CSS Grid for layouts
- Flexbox for component alignment
- CSS animations and transitions
- CSS variables for easy theming
- Media queries for responsive design
- Gradient backgrounds
- Box shadows and effects

## JavaScript Features

- Smooth scrolling to sections
- Navbar background change on scroll
- Intersection Observer for fade-in animations
- Button hover effects
- Event tracking and analytics
- Performance monitoring
- Keyboard navigation support

## Performance Optimizations

- Minimal CSS and JavaScript
- No external dependencies
- Optimized animations using CSS
- Efficient event listeners
- Lazy loading ready
- Mobile-first approach

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #00D9FF;
    --primary-dark: #0A0E27;
    /* ... */
}
```

### Content
Edit the HTML in `index.html` to update:
- Headlines and descriptions
- Feature list
- Capabilities
- Footer information

### Animations
Modify the animation timings and effects in `styles.css`:
```css
@keyframes pulse-glow {
    /* Customize animation */
}
```

## Deployment

### Option 1: Static Hosting
Upload all files to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

### Option 2: Traditional Web Server
Copy files to your web server's public directory and serve via HTTP/HTTPS.

### Option 3: Docker
Create a Dockerfile for containerized deployment:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## SEO Optimization

- Semantic HTML structure
- Meta tags for description and keywords
- Proper heading hierarchy
- Alt text ready for images
- Mobile-friendly design
- Fast loading times

## Analytics Integration

The JavaScript includes placeholder functions for analytics:
```javascript
trackEvent('button_click', { text: 'Launch FridayAI' });
trackEvent('section_view', { section: 'features' });
```

Connect to your analytics service (Google Analytics, Mixpanel, etc.) by implementing these functions.

## Future Enhancements

- Blog section with articles
- User testimonials carousel
- Pricing table
- Contact form with validation
- Newsletter subscription
- Live chat integration
- Video demonstrations
- Interactive demo section
- User authentication
- Dashboard integration

## License

© 2024 FridayAI. All rights reserved.

## Support

For questions or issues, please contact support@fridayai.com

---

Built with ❤️ for FridayAI users
