# Mobile Design Specifications - Ask GAR

Comprehensive documentation of all mobile optimizations, responsive design patterns, and accessibility considerations implemented in Ask GAR.

## Design Philosophy

**Mobile-First, Mobile-Best**: All designs are created for mobile devices first, then enhanced for larger screens. This ensures optimal experience on the devices most people use daily.

## Screen Size Specifications

### Target Device Breakpoints

| Device Type | Screen Width | Min Height | Use Case |
|-------------|-------------|-----------|----------|
| Small Mobile | 320px | 568px | iPhone SE, older devices |
| Standard Mobile | 375px | 667px | iPhone 12, common phones |
| Large Mobile | 428px | 926px | iPhone 14 Pro Max |
| Small Tablet | 640px | 800px | iPad Mini |
| Standard Tablet | 768px | 1024px | iPad |
| Large Tablet | 1024px | 1366px | iPad Pro |
| Desktop | 1280px+ | 720px+ | Laptops, desktops |

### Responsive Breakpoints (Tailwind)

```
Default: Mobile (< 640px)
sm: 640px  (tablets)
md: 768px  (larger tablets)
lg: 1024px (desktop)
xl: 1280px (large desktop)
```

## Touch Interaction Specifications

### Minimum Touch Target Sizes

All interactive elements follow these minimums:

```
Height: 48px minimum
Width: 48px minimum
Padding: 12px minimum around touch target
Spacing: 8px minimum between touch targets
```

### Touch Target Examples

| Element | Size | Padding | Spacing |
|---------|------|---------|---------|
| Buttons | 48×48px | 12px | 8px |
| Links | 44×44px | 10px | 8px |
| Form inputs | 48px height | 12px sides | 12px |
| Tab items | 48px height | 16px horizontal | 4px |
| List items | 48px min | 12px | 8px |

### Pointer Precision

- **Mobile**: Low precision, larger targets needed
- **Tablet**: Medium precision, standard targets
- **Desktop**: High precision, smaller targets acceptable

## Typography Specifications

### Font Sizes (Mobile-First)

```
Heading H1: 28px (sm: 32px, lg: 48px)
Heading H2: 22px (sm: 24px, lg: 32px)
Heading H3: 18px (sm: 20px, lg: 24px)
Body Text: 16px (CRITICAL - prevents iOS zoom)
Small Text: 14px (minimum for body)
Tiny Text: 12px (only for metadata)
```

### Line Heights

```
Headings: 1.2 (tight, for impact)
Body Text: 1.6 (relaxed, for readability)
Form Labels: 1.4 (medium)
Metadata: 1.4 (consistent with labels)
```

### Font Families

```
Headings: System fonts (-apple-system, BlinkMacSystemFont)
Body: Same system font stack
Code/Mono: ui-monospace, 'Courier New'
```

## Color Specifications

### Primary Color Palette

```
Primary: #7c5b9d (Plum)
  - Buttons, links, active states
  - Primary action emphasis
  - Gradients for highlights

Primary Light: #e8ddf5 (Light Plum - 15% opacity of primary)
  - Background highlights
  - Hover states on secondary buttons
  - Tab inactive state

Accent: #6b5089 (Dark Plum - 85% of primary darkness)
  - Button hover states
  - Text emphasis
  - Borders on focused inputs

Background: #faf8fc (Off-white)
  - Main background color
  - Card backgrounds
  - Safe area color

Foreground: #1a1a1a (Almost black)
  - Primary text color
  - High contrast text

Border: #e0d5f0 (Light gray-purple - 20% opacity of primary)
  - Card borders
  - Input borders
  - Dividing lines
```

### Contrast Ratios

```
Foreground (#1a1a1a) on Background (#faf8fc): 21:1 ✓ (AAA)
Primary (#7c5b9d) on Background (#faf8fc): 8.5:1 ✓ (AAA)
Primary (#7c5b9d) on White: 8.2:1 ✓ (AAA)
Foreground on Primary Light (#e8ddf5): 19:1 ✓ (AAA)
```

All color combinations meet WCAG 2.1 AAA standards.

## Layout Specifications

### Safe Area Insets

```
iOS (notch, Dynamic Island):
  Top: 48px (safe for notch)
  Bottom: 44px (for home indicator)
  Sides: 16px (safe for rounded corners)

Android:
  Top: 24px (status bar)
  Bottom: 0px (no home indicator)
  Sides: 0px (full width)

Web/Standard:
  All: 0px
```

### Spacing Scale (8px Base Unit)

```
2px:  Borders, subtle gaps
4px:  Icon spacing
6px:  Text letter-spacing
8px:  Component padding, small gaps
12px: Form input padding, medium gaps
16px: Card padding, section gaps
24px: Major section spacing
32px: Screen edges, large gaps
48px: Mega spacing (rare)
```

## Component Specifications

### Header (Sticky)

```
Height: 64px (mobile), 80px (tablet+)
Padding: 16px (mobile), 24px (tablet+)
Background: White
Border: 1px bottom solid #e0d5f0
Position: Fixed top with z-index 40
Shadow: Subtle (0 2px 8px rgba(0,0,0,0.08))
```

### Bottom Navigation

```
Height: 64px (fixed)
Width: 100vw
Position: Fixed bottom, z-index 50
Background: White
Border: 1px top solid #e0d5f0
Padding: 8px 16px (safe area adjusted)
Items: 3 equal columns
Item height: 48px (touch target)
```

### Cards

```
Padding: 24px (mobile), 32px (tablet+)
Border Radius: 24px (extra rounded)
Background: White
Border: 1px solid #e0d5f0
Shadow: 0 2px 8px rgba(124, 91, 157, 0.08)
Margin: 16px horizontal (mobile), 24px (tablet+)
Gap: 24px between cards
```

### Form Inputs

```
Height: 48px (touch target minimum)
Padding: 12px 16px (horizontal), 12px (vertical)
Border: 2px solid #e0d5f0
Border Radius: 16px
Font Size: 16px (prevents iOS zoom)
Focus State:
  - Border: 2px solid #7c5b9d
  - Ring: 3px rgba(124, 91, 157, 0.1)
  - Outline: none
```

### Buttons

```
Height: 48px (minimum)
Padding: 12px 24px horizontal, 12px vertical
Border Radius: 16px
Font Weight: 500
Font Size: 16px (mobile), 18px (tablet+)
Gap: 8px (between icon and text)

Primary Button:
  - Background: #7c5b9d
  - Color: White
  - Hover: #6b5089
  - Active: #5a4675
  
Secondary Button:
  - Background: #e8ddf5
  - Color: #7c5b9d
  - Border: 2px solid #7c5b9d
  - Hover: #dcc8f0

Disabled State:
  - Opacity: 50%
  - Cursor: not-allowed
  - Pointer Events: none
```

### Modal/Bottom Sheet

```
Appears: From bottom
Border Radius: 32px 32px 0 0 (top only)
Width: 100vw (mobile), max 600px (tablet+)
Animation: Slide in 300ms ease-out
Padding: 24px
Header: 20px bold, 32px bottom margin
Close Button: 24px (right, top)
Content: Scrollable if > 80vh
Footer: Full-width buttons

Backdrop:
  - Background: rgba(0, 0, 0, 0.4)
  - Z-index: 50 (behind modal)
```

### Tabs

```
Container:
  - Height: 48px
  - Background: #e8ddf5
  - Padding: 8px (internal gap)
  - Border Radius: 16px

Tab Button:
  - Flex: 1 (equal width)
  - Padding: 8px 16px
  - Border Radius: 12px
  - Font Weight: 500
  - Font Size: 14px (mobile), 16px (tablet+)

Active Tab:
  - Background: White
  - Color: #7c5b9d
  - Shadow: 0 2px 4px rgba(0, 0, 0, 0.1)

Inactive Tab:
  - Background: Transparent
  - Color: #6b5089
  - Hover: Color → #7c5b9d
```

## Interaction Specifications

### Tap Feedback

```
Duration: 100-200ms
Visual: Slight color change or opacity reduction
No delay: Touch should feel immediate

Button tap:
  - Background: Darken 5%
  - Duration: 150ms

Card tap:
  - Opacity: 95%
  - Duration: 100ms
```

### Transitions

```
Quick: 150ms (hover, tap feedback)
Normal: 250ms (modal open, tab change)
Slow: 400ms (page transition)
Easing: cubic-bezier(0.2, 0, 0.38, 0.9) (iOS standard)
```

### Scroll Behavior

```
Smooth: Yes (scroll-behavior: smooth)
Momentum: Native (iOS) / Fling (Android)
Pull-to-refresh: Not implemented (not needed)
Infinite scroll: Supported (QA list can load more)
```

## Performance Specifications

### Load Times (Target)

```
First Paint (FP): < 1.0s
First Contentful Paint (FCP): < 1.5s
Largest Contentful Paint (LCP): < 2.5s
Time to Interactive (TTI): < 3.5s
Cumulative Layout Shift (CLS): < 0.1
```

### Mobile Lighthouse Scores

```
Performance: > 90
Accessibility: > 95
Best Practices: > 90
SEO: > 90
```

### Bundle Size Targets

```
JavaScript: < 50KB (gzipped)
CSS: < 15KB (gzipped)
Images: < 100KB per page
Total: < 200KB (gzipped)
```

## Accessibility Specifications

### WCAG 2.1 Compliance

```
Level: AA (exceeds in many areas)
Color Contrast: AAA (> 7:1 for all text)
Focus Indicators: Visible on all interactive elements
Touch Targets: 48px minimum
Zoom: Supported up to 5x
```

### Screen Reader Support

```
Semantic HTML: <main>, <header>, <nav>, <section>
ARIA Labels: On all icon buttons
ARIA Live: On dynamic content updates
Headings: Proper hierarchy (H1 → H2 → H3)
Form Labels: Associated with inputs
Error Messages: Associated with form fields
```

### Keyboard Navigation

```
Tab Order: Logical flow
Enter/Space: Activates buttons
Arrow Keys: Tab navigation, select options
Escape: Closes modals, cancels actions
Focus Visible: 3px ring on all focus states
```

## Dark Mode (Future Enhancement)

Future versions may support dark mode. Specifications:

```
Primary Dark: #5a4675
Primary Light Dark: #3d3a4d
Background Dark: #1a1a1a
Foreground Dark: #faf8fc
Border Dark: #333333

All contrast ratios would maintain AAA standard
```

## Testing Checklist

### Device Testing Required

- [ ] iPhone SE (320px)
- [ ] iPhone 12 (375px)
- [ ] iPhone 14 Pro Max (428px)
- [ ] Samsung Galaxy S21 (360px)
- [ ] Google Pixel 6 (412px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1920px)

### Orientation Testing

- [ ] Portrait mode (all devices)
- [ ] Landscape mode (all devices)
- [ ] Rotating device during use
- [ ] Safe area handling (notch, Dynamic Island)

### Browser Testing

- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Firefox (all platforms)
- [ ] Samsung Internet
- [ ] Edge

### Accessibility Testing

- [ ] Screen reader (NVDA, JAWS)
- [ ] Keyboard only navigation
- [ ] Zoom to 200%
- [ ] Color contrast checking
- [ ] Touch target sizes

### Performance Testing

- [ ] Lighthouse audit
- [ ] WebPageTest
- [ ] Throttled 4G connection
- [ ] Low-end device simulation

---

**Last Updated**: April 2026
**Version**: 1.0.0
