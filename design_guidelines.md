# Design Guidelines: University Hackathon + Workshop Registration System

## Design Approach
**Selected Approach:** Design System (Linear/Material Design inspired)  
**Justification:** This is a utility-focused registration and admin management system where efficiency, clarity, and data organization are paramount. The application requires consistent form patterns, clear information hierarchy, and professional dashboard layouts.

**Key Design Principles:**
- Clarity over decoration: Every element serves a functional purpose
- Information hierarchy: Clear visual distinction between primary and secondary actions
- Professional efficiency: Minimize cognitive load for form completion and admin tasks
- Trust-building aesthetics: Clean, modern interface that inspires confidence in handling registration data

## Typography

**Font Selection:** Inter (Google Fonts)
- **Headings (h1):** font-size: text-4xl (36px), font-weight: 700, line-height: tight
- **Headings (h2):** font-size: text-2xl (24px), font-weight: 600, line-height: tight
- **Headings (h3):** font-size: text-xl (20px), font-weight: 600
- **Body Text:** font-size: text-base (16px), font-weight: 400, line-height: relaxed
- **Labels:** font-size: text-sm (14px), font-weight: 500
- **Captions/Helper Text:** font-size: text-xs (12px), font-weight: 400

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16**
- Component padding: p-4, p-6, p-8
- Section spacing: space-y-6, space-y-8
- Grid gaps: gap-4, gap-6
- Margins: m-2, m-4, m-8

**Container Strategy:**
- Max-width container: max-w-7xl mx-auto px-4 for main content
- Form containers: max-w-2xl mx-auto for single-column forms
- Admin tables: Full-width with max-w-7xl

## Core Components

### Navigation & Header
- Fixed top navigation: Sticky header with h-16 height
- Logo + Navigation links (left-aligned)
- User profile/logout (right-aligned)
- Mobile: Hamburger menu pattern
- Bottom border separator (border-b)

### Authentication Pages (Login/Signup/Reset)
- Centered card layout: max-w-md mx-auto mt-16
- Card structure: Rounded corners (rounded-lg), elevated shadow (shadow-lg), padding p-8
- Form spacing: space-y-6 between form groups
- Single column, vertically centered in viewport (min-h-screen flex items-center)

### Dashboard Cards (User & Admin)
- Grid layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Stat cards: Rounded (rounded-lg), shadow (shadow-md), padding p-6
- Card content: Icon/number (large, text-3xl font-bold), label below (text-sm)
- Hover state: Subtle lift effect (hover:shadow-lg transition-shadow)

### Form Components
**Form Container:**
- White card with rounded-lg, shadow-md, padding p-6 to p-8
- Form sections separated with space-y-6

**Input Fields:**
- Label above input: text-sm font-medium mb-2
- Input styling: Rounded borders (rounded-md), padding px-4 py-2.5, full-width, border
- Focus state: Ring effect (focus:ring-2, focus:outline-none)
- Error state: Red border + error message below (text-xs text-red-600 mt-1)

**Team Member Addition (Hackathon):**
- Dynamic form section with "Add Member" button
- Each member in separate card/container with padding p-4, rounded border
- Remove button (small, text-based) on each member card
- Maximum 4 members enforced

**Buttons:**
- Primary: Rounded (rounded-md), padding px-6 py-2.5, font-medium
- Secondary: Outlined variant with border
- Full-width for form submissions: w-full
- Icon + text combinations where appropriate

### Data Tables (Admin Panel)
- Full-width responsive table with border (border rounded-lg overflow-hidden)
- Table headers: Sticky positioning, font-semibold, padding px-4 py-3
- Table rows: Padding px-4 py-3, border-b separators, hover state
- Action buttons column: Right-aligned, small icon buttons (Edit/Delete)
- Mobile: Stack table cells or horizontal scroll with overflow-x-auto
- Search bar: Top-aligned, mb-4, with icon inside input
- Filters: Dropdown selects, inline with search

### Admin Dashboard Layout
- Two-column header: Page title (left) + action buttons like "Export CSV" (right)
- Stat cards row: Grid of 3-4 cards showing totals (mb-8)
- Tabs navigation: Horizontal tabs (Hackathons | Workshops) with underline indicator
- Content area: Data table below tabs

### User Dashboard Layout
- Welcome header: "Welcome, [Name]" with subtitle showing email
- Profile card: Left sidebar or top section with profile details + "Edit Profile" button
- Events section: Grid of available event cards (Hackathon, Workshop)
- Event cards: Image/icon, title, description, "Register" CTA or "Registered" status badge

### Event Registration Cards
- Card format: rounded-lg, shadow-md, padding p-6
- Header with event icon/badge
- Event details list (date, location, requirements)
- Registration status indicator (badge component)
- CTA button at bottom

### Success/Confirmation Screens
- Centered layout with checkmark icon (large, text-6xl)
- Success message (text-2xl font-semibold)
- Confirmation details below
- "Back to Dashboard" button

### Email Confirmation Modals/Notifications
- Toast notifications: Top-right corner, rounded, shadow-lg, padding p-4
- Auto-dismiss after 5 seconds
- Success/error variants with icons

## Component Library

**Icons:** Heroicons (via CDN)
- Navigation: Menu, X, User, LogOut
- Forms: Mail, Lock, User, Phone, Building (college)
- Admin: Download, Edit, Trash, Search, Filter
- Status: CheckCircle, XCircle, Clock

**Badges:**
- Rounded-full pill style: px-3 py-1, text-xs font-medium, rounded-full
- Status variants: Registered, Pending, Available

**Loading States:**
- Skeleton loaders for tables: Animated gradient backgrounds
- Spinner for button loading: Inline icon, disable button state

## Responsive Breakpoints

- Mobile (base): Single column, stacked forms, hamburger menu
- Tablet (md: 768px): Two-column grids, expanded navigation
- Desktop (lg: 1024px): Three-column grids, full table layouts, sidebar layouts

## Accessibility
- All form inputs have associated labels (id/for attributes)
- Focus indicators on all interactive elements (focus:ring)
- Keyboard navigation support for modals and dropdowns
- ARIA labels for icon-only buttons
- Error messages programmatically associated with inputs

## Animations
**Minimal, purposeful animations only:**
- Page transitions: Simple fade-in
- Button hovers: Scale-105 or shadow expansion
- Modal entry: Fade + slide-up effect (duration-200)
- Loading spinners: Rotate animation
- Avoid: Complex scroll animations, unnecessary micro-interactions

## Images
**Hero Section:** Yes - Landing page includes a hero section
- Hero image: Modern illustration or photo of students collaborating/coding
- Placement: Full-width background with overlay, height: h-96 to h-screen on landing
- Content overlay: Centered text + CTA with blurred background on buttons (backdrop-blur-sm)

**Dashboard Icons/Illustrations:**
- Event cards: Small illustrative icons or event-specific graphics (top of card)
- Empty states: Friendly illustration when no registrations exist
- Success screens: Celebration/checkmark illustrations

This system prioritizes clarity, efficiency, and professional polish suitable for a university-facing registration platform.