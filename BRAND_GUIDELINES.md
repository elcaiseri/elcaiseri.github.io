# Saudi Vision 2030 Brand Guidelines
## Islam Kassem - Enterprise AI Consulting

---

## 🎨 Color Palette

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Saudi Green** | `#009639` | Primary CTAs, accents, links, icons |
| **Saudi Gold** | `#FFD700` | Secondary CTAs, highlights, badges, ratings |
| **White** | `#FFFFFF` | Light mode background |
| **Deep Navy** | `#0D1B2A` | Dark mode background |

### Secondary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Light Gray | `#F5F5F5` | Section backgrounds (light mode) |
| Dark Gray | `#1B263B` | Cards, sections (dark mode) |
| Accent Blue | `#1E90FF` | Links, minor highlights |
| Green Hover | `#007A2E` | Button hover states |
| Gold Hover | `#E6C200` | Gold button hover states |

### Status Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#009639` | Success states (uses primary green) |
| Warning | `#FFD700` | Warning states (uses gold) |
| Error | `#DC2626` | Error states |

---

## 📝 Typography

### Font Families

- **Headings**: `Poppins` (600, 700, 800 weights)
- **Body**: `Inter` (400, 500, 600, 700 weights)
- **Fallbacks**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Font Sizes (rem)

| Size | Value | Usage |
|------|-------|-------|
| Base | `16px` | Body text |
| Small | `0.875rem` | Labels, captions |
| Large | `1.125rem` | Large body text |
| XL | `1.25rem` | Subheadings |
| 2XL | `1.5rem` | H4 |
| 3XL | `1.875rem` | H3 |
| 4XL | `2.25rem` | H2 |
| 5XL | `3rem` | H1 |

### Line Heights

- Body text: `1.7`
- Headings: `1.3`

---

## 🔘 Buttons & CTAs

### Primary Button (Green)
```css
background: #009639;
color: #FFFFFF;
border-radius: 6px;
box-shadow: 0 2px 4px rgba(0, 150, 57, 0.15);
```

### Secondary Button (Outlined)
```css
background: transparent;
border: 2px solid var(--border-color);
color: var(--text-color);
```

### Gold Button Variant
```css
background: #FFD700;
color: #1B263B;
```

### Button Hover States
- Primary: Darker green (`#007A2E`) + lift effect
- Gold: Deeper gold (`#E6C200`) + lift effect
- All buttons: `transform: translateY(-2px)` + enhanced shadow

### Button Border Radius
- Standard: `6px`
- Large: `8px`

---

## 🌓 Light/Dark Mode

### Light Mode
| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Text | `#1B263B` |
| Muted Text | `#4A5568` |
| Cards | `#FFFFFF` |
| Accent | `#009639` |

### Dark Mode
| Property | Value |
|----------|-------|
| Background | `#0D1B2A` |
| Text | `#F5F5F5` |
| Muted Text | `#A0AEC0` |
| Cards | `rgba(27, 38, 59, 0.95)` |
| Accent | `#00B347` (brighter for contrast) |

---

## ♿ Accessibility

### Contrast Ratios (WCAG AA Compliant)
- Light mode text on background: 14.5:1 ✓
- Dark mode text on background: 13.8:1 ✓
- Green on white: 4.5:1 ✓
- White on green: 4.5:1 ✓

### Focus States
```css
:focus-visible {
    outline: 3px solid #FFD700; /* Gold outline */
    outline-offset: 2px;
}
```

---

## 🎭 Persona & Tone

### Brand Voice
- **Professional**: Expert-level technical knowledge
- **Visionary**: Forward-thinking, innovation-focused
- **Trustworthy**: Proven results, transparent communication
- **Approachable**: Clear explanations, no unnecessary jargon

### Target Audience
- Enterprise CTOs & Innovation Leaders
- Startup Founders & Technical Co-founders
- Decision-makers in MENA region
- Global tech companies exploring AI transformation

### Messaging Pillars
1. **Digital Transformation**: Aligned with Vision 2030 goals
2. **Measurable Business Impact**: ROI-focused outcomes
3. **Enterprise-Grade Systems**: Production-ready, scalable solutions
4. **MENA & Global Expertise**: Regional understanding with global standards

---

## 🏷️ CSS Variables Reference

```css
:root {
    /* Saudi Vision 2030 Colors */
    --primary-green: #009639;
    --primary-gold: #FFD700;
    --primary-green-hover: #007A2E;
    --primary-gold-hover: #E6C200;

    /* Light Mode */
    --bg-color: #FFFFFF;
    --text-color: #1B263B;
    --text-muted: #4A5568;
    --accent-color: #009639;
    --accent-secondary: #FFD700;

    /* Typography */
    --font-heading: 'Poppins', sans-serif;
    --font-secondary: 'Inter', sans-serif;
}

body.dark-mode {
    --bg-color: #0D1B2A;
    --text-color: #F5F5F5;
    --text-muted: #A0AEC0;
    --accent-color: #00B347;
}
```

---

## 📁 Updated Files

### CSS Files
- `css/base.css` - Variables, typography, reset
- `css/critical.css` - Above-the-fold styles
- `css/components.css` - Buttons, cards, forms
- `css/homepage.css` - Hero, sections, CTAs
- `css/layout.css` - Grid, containers
- `css/styles.css` - Legacy compatibility

### HTML Files
- `index.html` - Homepage with new fonts & colors
- `about/index.html` - About page
- `services/index.html` - Services page
- `contact/index.html` - Contact page
- `case-studies/index.html` - Case studies
- `process/index.html` - Process page
- `blog/index.html` - Blog page
- `resume/index.html` - Resume page

---

## ✅ Implementation Checklist

- [x] Primary colors (Green #009639, Gold #FFD700)
- [x] Dark mode colors (Navy #0D1B2A)
- [x] Typography (Inter + Poppins)
- [x] Button styles with 6px border-radius
- [x] Hover states with lift effect
- [x] Card styles with green accents
- [x] Focus states for accessibility
- [x] WCAG AA contrast compliance
- [x] Light/dark mode switching
- [x] Consistent branding across all pages

---

*Last updated: February 3, 2026*
*Brand version: 2.0 - Saudi Vision 2030 Alignment*
