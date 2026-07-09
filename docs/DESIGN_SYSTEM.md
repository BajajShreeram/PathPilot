# PathPilot - Design System

Complete design system guidelines for building a consistent, beautiful, and motivating user experience.

---

## Brand Identity

### App Name
**PathPilot**

### Tagline
**Build Your Future.**

### Mission
Empower students to discover their potential, plan their journey, and achieve their dreams through AI-powered guidance.

### Brand Personality
- **Friendly**: Approachable and supportive
- **Motivating**: Encouraging and inspiring
- **Professional**: Trustworthy and reliable
- **Modern**: Clean and contemporary
- **Empowering**: Student-centric and actionable

---

## Color Palette

### Primary Colors

#### Primary Blue
- **Hex**: `#2563EB`
- **RGB**: `37, 99, 235`
- **Tailwind**: `bg-primary` or `bg-blue-600`
- **Usage**: Primary actions, links, highlights, navigation
- **Represents**: Trust, professionalism, clarity

#### Success Green
- **Hex**: `#10B981`
- **RGB**: `16, 185, 129`
- **Tailwind**: `bg-success` or `bg-green-500`
- **Usage**: Success messages, completed milestones, positive actions
- **Represents**: Growth, achievement, progress

#### AI Purple
- **Hex**: `#8B5CF6`
- **RGB**: `139, 92, 246`
- **Tailwind**: `bg-ai` or `bg-purple-500`
- **Usage**: AI features, smart suggestions, roadmap generation
- **Represents**: Intelligence, innovation, magic

#### Warning Orange
- **Hex**: `#F59E0B`
- **RGB**: `245, 158, 11`
- **Tailwind**: `bg-warning` or `bg-amber-500`
- **Usage**: Warnings, deadlines, important notices
- **Represents**: Attention, urgency, caution

#### Error Red
- **Hex**: `#EF4444`
- **RGB**: `239, 68, 68`
- **Tailwind**: `bg-error` or `bg-red-500`
- **Usage**: Errors, validation failures, destructive actions
- **Represents**: Errors, alerts, danger

### Neutral Colors

#### Background
- **Hex**: `#F8FAFC`
- **RGB**: `248, 250, 252`
- **Tailwind**: `bg-background` or `bg-slate-50`
- **Usage**: Page background, card backgrounds
- **Represents**: Cleanliness, spaciousness, clarity

#### Text Primary
- **Hex**: `#111827`
- **RGB**: `17, 24, 39`
- **Tailwind**: `text-text` or `text-gray-900`
- **Usage**: Headings, primary text, important content
- **Represents**: Readability, professionalism

#### Text Secondary
- **Hex**: `#6B7280`
- **RGB**: `107, 114, 128`
- **Tailwind**: `text-gray-500`
- **Usage**: Secondary text, descriptions, labels
- **Represents**: Subtlety, hierarchy

#### White
- **Hex**: `#FFFFFF`
- **RGB**: `255, 255, 255`
- **Tailwind**: `bg-white`
- **Usage**: Cards, modals, surfaces
- **Represents**: Purity, simplicity

### Color Usage Guidelines

```typescript
// ✅ Good - Semantic color usage
<button className="bg-primary text-white">Primary Action</button>
<div className="bg-success">Success Message</div>
<span className="text-ai">AI Feature</span>

// ❌ Bad - Hardcoded colors
<button className="bg-blue-600">Action</button>
<div style={{ backgroundColor: '#10B981' }}>Message</div>
```

---

## Typography

### Font Families

#### Headings - Poppins
- **Weights**: 600 (SemiBold), 700 (Bold), 800 (ExtraBold)
- **Usage**: Page titles, section headings, hero text
- **Characteristics**: Modern, geometric, attention-grabbing
- **Google Fonts**: `Poppins:wght@600;700;800`

#### Body - Inter
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Usage**: Paragraphs, buttons, labels, body text
- **Characteristics**: Readable, professional, optimized for screens
- **Google Fonts**: `Inter:wght@300;400;500;600;700`

### Typography Scale

```css
/* Headings (Poppins) */
.text-6xl   { font-size: 3.75rem; }  /* Hero titles */
.text-5xl   { font-size: 3rem; }     /* Page titles */
.text-4xl   { font-size: 2.25rem; }  /* Section titles */
.text-3xl   { font-size: 1.875rem; } /* Subsection titles */
.text-2xl   { font-size: 1.5rem; }   /* Card titles */
.text-xl    { font-size: 1.25rem; }  /* Large body text */

/* Body Text (Inter) */
.text-base  { font-size: 1rem; }     /* Standard body */
.text-sm    { font-size: 0.875rem; } /* Small text */
.text-xs    { font-size: 0.75rem; }  /* Extra small text */
```

### Typography Usage

```typescript
// ✅ Good - Semantic usage
<h1 className="text-5xl font-heading font-bold text-primary">
  PathPilot
</h1>
<p className="text-base font-body text-text">
  Build Your Future.
</p>

// Section headings
<h2 className="text-3xl font-heading font-semibold">Discover Careers</h2>

// Card titles
<h3 className="text-2xl font-heading font-semibold">Software Engineer</h3>

// Body text
<p className="text-base font-body text-gray-600">
  Explore career paths tailored to your interests.
</p>
```

---

## Design Inspiration

### Apple
- **Clean Layout**: Whitespace and breathing room
- **Minimalism**: Focus on content, not decoration
- **Typography**: Clear hierarchy, readable text
- **Product Focus**: Content is the star

### Notion
- **Organized**: Clear structure and navigation
- **Functional**: Every element serves a purpose
- **Subtle Animations**: Smooth, non-distracting
- **Card-Based**: Information organized in cards

### ChatGPT
- **Conversational**: Friendly and approachable
- **Simple Interface**: No clutter, clear focus
- **AI-Centric**: Smart features front and center
- **Responsive**: Fast, reactive interactions

### Duolingo (Light Touch)
- **Motivating**: Progress tracking, achievements
- **Gamification**: Streaks, milestones (subtle)
- **Encouragement**: Positive reinforcement
- **Friendly Mascot**: Optional character guidance

---

## UI Components

### Buttons

#### Primary Button
```typescript
<button className="px-6 py-3 bg-primary text-white font-medium rounded-lg 
  hover:bg-blue-700 transition-colors shadow-sm">
  Get Started
</button>
```

#### Secondary Button
```typescript
<button className="px-6 py-3 bg-white text-primary border-2 border-primary 
  font-medium rounded-lg hover:bg-blue-50 transition-colors">
  Learn More
</button>
```

#### Icon Button
```typescript
<button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
  <Icon className="w-6 h-6 text-gray-600" />
</button>
```

### Cards

#### Standard Card
```typescript
<div className="bg-white rounded-xl shadow-md hover:shadow-lg 
  transition-shadow p-6 border border-gray-100">
  <h3 className="text-2xl font-heading font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600">Card content goes here.</p>
</div>
```

#### Feature Card
```typescript
<div className="bg-gradient-to-br from-primary to-blue-700 
  text-white rounded-xl shadow-lg p-6">
  <Icon className="w-12 h-12 mb-4" />
  <h3 className="text-2xl font-heading font-semibold mb-2">Feature Name</h3>
  <p className="text-blue-100">Feature description here.</p>
</div>
```

### Input Fields

#### Text Input
```typescript
<input 
  type="text"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg
    focus:ring-2 focus:ring-primary focus:border-transparent
    transition-shadow outline-none"
  placeholder="Enter your email"
/>
```

#### Search Input
```typescript
<div className="relative">
  <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
  <input 
    type="search"
    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
    placeholder="Search careers..."
  />
</div>
```

---

## Spacing System

### Padding & Margin Scale
```
p-0  = 0px
p-1  = 4px
p-2  = 8px
p-3  = 12px
p-4  = 16px (Standard)
p-5  = 20px
p-6  = 24px
p-8  = 32px
p-10 = 40px
p-12 = 48px
p-16 = 64px
```

### Layout Guidelines
- **Container Max Width**: `max-w-7xl` (1280px)
- **Section Spacing**: `py-16` or `py-20`
- **Card Spacing**: `p-6` or `p-8`
- **Element Spacing**: `space-y-4` or `space-y-6`

---

## Shadows & Effects

### Shadow Scale
```css
.shadow-sm   /* Subtle shadow for cards */
.shadow-md   /* Standard shadow */
.shadow-lg   /* Prominent shadow for elevated elements */
.shadow-xl   /* Large shadow for modals */
```

### Border Radius
```css
.rounded      /* 4px - small elements */
.rounded-lg   /* 8px - cards, buttons */
.rounded-xl   /* 12px - prominent cards */
.rounded-2xl  /* 16px - hero sections */
.rounded-full /* Full circle - avatars, icon buttons */
```

---

## Animations & Transitions

### Transition Utilities
```typescript
// Hover effects
className="transition-colors duration-200 hover:bg-blue-700"
className="transition-transform duration-200 hover:scale-105"
className="transition-shadow duration-200 hover:shadow-lg"

// Multiple properties
className="transition-all duration-300"
```

### Animation Guidelines
- **Subtle**: Keep animations smooth and non-intrusive
- **Fast**: Use 200-300ms durations
- **Purposeful**: Animate only when it enhances UX
- **Consistent**: Use same timing functions across the app

### Common Animations
```typescript
// Fade in on load
className="animate-fade-in"

// Slide in from bottom
className="animate-slide-up"

// Pulse on new content
className="animate-pulse"
```

---

## Layout Patterns

### Hero Section
```typescript
<section className="bg-gradient-to-br from-primary to-blue-700 
  text-white py-20 px-4">
  <div className="max-w-7xl mx-auto text-center">
    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">
      PathPilot
    </h1>
    <p className="text-xl md:text-2xl mb-8">Build Your Future.</p>
    <button className="px-8 py-4 bg-white text-primary rounded-lg
      font-semibold text-lg hover:bg-gray-100 transition-colors">
      Get Started
    </button>
  </div>
</section>
```

### Feature Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map(feature => (
    <FeatureCard key={feature.id} {...feature} />
  ))}
</div>
```

### Dashboard Layout
```typescript
<div className="min-h-screen bg-background">
  <Header />
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <aside className="lg:col-span-3">
        <Sidebar />
      </aside>
      <main className="lg:col-span-9">
        <Content />
      </main>
    </div>
  </div>
</div>
```

---

## Icons

### Icon Library
Use **Heroicons** (by Tailwind creators) or **Lucide Icons**

### Icon Usage
```typescript
// Outline icons for regular use
<HomeIcon className="w-6 h-6 text-gray-600" />

// Solid icons for active/selected states
<HomeIconSolid className="w-6 h-6 text-primary" />

// Icon with text
<div className="flex items-center gap-2">
  <CheckIcon className="w-5 h-5 text-success" />
  <span>Completed</span>
</div>
```

---

## Responsive Design

### Breakpoints
```
sm:  640px  (Mobile landscape, small tablets)
md:  768px  (Tablets)
lg:  1024px (Laptops, small desktops)
xl:  1280px (Desktops)
2xl: 1536px (Large desktops)
```

### Mobile-First Approach
```typescript
// ✅ Good - Mobile first
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>

// ❌ Bad - Desktop first
<div className="text-xl lg:text-base">
  Non-responsive text
</div>
```

### Responsive Grid
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Cards */}
</div>
```

---

## Accessibility

### Color Contrast
- **Text on Background**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **Interactive Elements**: Clear focus states

### Focus States
```typescript
// Always include focus styles
className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
```

### Alt Text
```typescript
// Always include alt text for images
<img src="career.jpg" alt="Software Engineer working on laptop" />
```

### Semantic HTML
```typescript
// Use proper HTML elements
<button>Click Me</button>  // ✅
<div onClick={...}>Click</div>  // ❌
```

---

## Dark Mode (Future)

While Phase 1 focuses on light mode, the design system is prepared for dark mode:

```typescript
// Dark mode classes (to be implemented)
className="bg-white dark:bg-gray-900"
className="text-gray-900 dark:text-gray-100"
```

---

## Loading States

### Spinner
```typescript
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
```

### Skeleton Loader
```typescript
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
  <div className="h-4 bg-gray-200 rounded w-1/2" />
</div>
```

---

## Empty States

```typescript
<div className="text-center py-12">
  <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
  <h3 className="text-xl font-heading font-semibold mb-2">
    No Results Found
  </h3>
  <p className="text-gray-600 mb-4">
    Try adjusting your search criteria
  </p>
  <button className="px-4 py-2 bg-primary text-white rounded-lg">
    Clear Filters
  </button>
</div>
```

---

## Design System Checklist

When creating new components:

- [ ] Uses design system colors (not hardcoded hex)
- [ ] Uses Poppins for headings, Inter for body
- [ ] Rounded corners (rounded-lg or rounded-xl)
- [ ] Appropriate shadow (shadow-sm or shadow-md)
- [ ] Hover states for interactive elements
- [ ] Focus states for keyboard navigation
- [ ] Mobile responsive (mobile-first approach)
- [ ] Consistent spacing (p-4, p-6, etc.)
- [ ] Smooth transitions (200-300ms)
- [ ] Semantic HTML elements
- [ ] Accessible (contrast, alt text, ARIA labels)

---

## Examples

### Career Card Component
```typescript
<div className="bg-white rounded-xl shadow-md hover:shadow-lg 
  transition-shadow p-6 border border-gray-100">
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="text-2xl font-heading font-semibold text-text mb-1">
        Software Engineer
      </h3>
      <p className="text-sm text-gray-500">Technology</p>
    </div>
    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
      <BookmarkIcon className="w-6 h-6 text-gray-400" />
    </button>
  </div>
  <p className="text-gray-600 mb-4">
    Design, develop, and maintain software applications...
  </p>
  <div className="flex items-center gap-4 text-sm text-gray-500">
    <span className="flex items-center gap-1">
      <TrendingUpIcon className="w-4 h-4" />
      High Demand
    </span>
    <span className="flex items-center gap-1">
      <DollarIcon className="w-4 h-4" />
      $90k-$150k
    </span>
  </div>
</div>
```

---

## Resources

- **Tailwind Docs**: https://tailwindcss.com/docs
- **Heroicons**: https://heroicons.com/
- **Google Fonts**: https://fonts.google.com/
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

---

**Remember**: Consistency is key. Follow this design system to create a cohesive, professional, and motivating user experience throughout PathPilot!
