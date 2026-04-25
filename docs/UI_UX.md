# Purano Kitab - UI/UX Design Guide

## Design System

### Color Palette
```
Primary: #D4A85A (Gold - representing old books)
Secondary: #9C6B3C (Brown - earthy tone)
Background: #1C1208 (Very Dark Brown - loader background)
Background Light: #FDF6EC (Cream - light backgrounds)
Text: #333333 (Dark Gray)
Text Light: #9c6b3c (Secondary brown)
Border: #E0D5C7 (Light tan)
Error: #E53935 (Red)
Success: #43A047 (Green)
```

### Typography
```
Font Family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
Headings: Bold, 24-32px
Body: Regular, 14-16px
Caption: Regular, 12px
Label: Medium, 14px
```

### Spacing
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
```

### Border Radius
```
Small: 8px
Medium: 12px
Large: 16px
Full: 9999px (for circles)
```

---

## Screen Flows

### Authentication Flow

#### Login Screen
- Email input field
- Password input field (with show/hide toggle)
- Remember me checkbox
- Sign In button
- Divider
- Social Login (Google)
- Sign Up link

#### Google OAuth Success Page
- Loading state with BookLoader animation
- Status messages: "Verifying...", "Authenticating...", "Success! Redirecting..."

#### Registration Screen
- Name input
- Email input
- Password input (with strength indicator)
- Phone input (optional)
- Terms checkbox
- Register button
- Login link

---

### Home Screen (Protected)

#### Header
- App logo/title
- Profile icon (opens drawer)
- Search icon
- Notification icon

#### Hero Section
- Welcome message
- Featured books carousel

#### Recently Listed
- Horizontal scroll list of recent books

#### Featured Books
- Grid layout (2 columns)
- Book cards with image, title, author, price

#### Footer Navigation
- Home (active)
- Search
- My Listings
- Favorites
- Profile

---

### Book Listing Screen

#### Book Card Layout
```
┌─────────────────────┐
│    Book Image       │
├─────────────────────┤
│ Title (2 lines)     │
│ Author              │
├─────────────────────┤
│ ⭐ 4.5 (12 reviews) │
│ Condition: Good     │
├─────────────────────┤
│ ₹250                │
│ [Add to Favorites]  │
└─────────────────────┘
```

#### Book Detail Screen
- Large book image carousel
- Title, Author, ISBN
- Seller info card
- Price and condition badge
- Description
- Reviews section
- Buy Now button

---

### User Profile Screen

#### Profile Header
- Avatar
- Name
- Rating (stars)
- Total reviews count

#### Profile Sections
- Bio
- Join date
- Books Listed
- Books Sold
- Contact info

#### Action Buttons
- Edit Profile
- Settings
- Logout

#### Settings Options
- Change Password
- Change Email
- Change Phone
- Theme
- Notifications
- Privacy

---

### Sell Book Screen

#### Form Fields
- Book Title
- Author
- ISBN (optional)
- Category dropdown
- Condition dropdown (New, Like New, Good, Fair, Poor)
- Price
- Description
- Image upload (multiple)

#### Form Features
- Input validation
- Error messages
- Auto-fill from ISBN
- Image preview
- Save as draft

---

## Component Library

### Button
```
Variants: primary, secondary, outline, text
Sizes: small, medium, large
States: default, disabled, loading
```

### Text Input
```
States: default, focused, error, disabled
Features: icon support, helper text, error message
```

### Card
```
Padding: 16px
Border radius: 12px
Shadow: subtle
```

### Toast Notification
```
Types: success, error, warning, info
Position: bottom
Duration: 3-4 seconds auto-hide
```

### Loading States
- BookLoader (custom book animation)
- Skeleton screens for list items
- Loading spinners

### Empty States
- Empty search results
- No books listed
- No favorites

---

## User Interactions

### Gestures
- Tap: Select, confirm
- Long press: Copy, options menu
- Swipe: Navigation, dismiss
- Pull to refresh: Reload list

### Feedback
- Toast notifications for actions
- Loading indicators during API calls
- Success/error message display
- Haptic feedback on important actions

### Navigation
- Bottom tab navigation (primary)
- Stack navigation (within tabs)
- Modal navigation (for overlays)
- Deep linking (direct screen access via URLs)

---

## Accessibility

### Principles
- Minimum contrast ratio 4.5:1 for text
- Touch targets minimum 48x48px
- Semantic HTML/RN components
- Descriptive labels and alt text

### Implementation
- WCAG 2.1 AA compliance target
- Screen reader support
- Keyboard navigation support
- Color not the only indicator

---

## Responsive Design

### Breakpoints
- Mobile: < 480px
- Tablet: 480px - 1024px
- Desktop: > 1024px

### Adaptive Layouts
- Stack content on small screens
- Grid layout on larger screens
- Adjust font sizes per breakpoint
- Full-width on mobile, contained on tablet/desktop

---

## Dark Mode

### Color Adjustments
- Background: #1C1208 (already dark)
- Text: #F5F5F5 (light gray)
- Secondary text: #B0B0B0
- Cards: #2A1F14

---

## Animations

### Page Transitions
- Slide from right (forward)
- Slide from left (backward)
- Fade (modal)
- Duration: 300ms, easing: ease-out

### Micro-interactions
- Button feedback: scale + opacity
- List item hover: background color change
- Loading spinner: rotate 360° continuous
- Success checkmark: scale + opacity sequence

### Loader Animation
- Book flip animation
- Dust particles floating
- Animated dots
- Changing loading phrases

---

## Error Handling

### Validation Errors
- Inline error message below field
- Error color (red) for input border
- Prevent form submission

### API Errors
- Toast notification with error message
- Retry button for network errors
- Redirect to login for 401 errors

### Edge Cases
- Empty states with helpful messaging
- Network timeout handling
- Missing images fallback
- Invalid data display

---

## Performance Considerations

### Image Optimization
- Lazy loading
- Responsive images (srcset)
- WebP format support
- Image compression

### Code Splitting
- Route-based code splitting
- Lazy load modals
- Dynamic imports for heavy components

### Caching
- Cache API responses with React Query
- Cache images
- Cache static assets

---

## Branding

### Logo
- Use in header
- Use in loader
- Use in empty states

### Voice & Tone
- Friendly and approachable
- Professional
- Encouraging
- Clear and concise

### Key Messages
- "Explore rare collections"
- "Connect with fellow readers"
- "Buy. Sell. Share books."
