# Student Pages Structure

This directory contains the restructured student dashboard with proper navigation-based architecture using the `@routers/` system.

## Structure

```
src/
├── routers/                           # Router configuration
│   ├── index.ts                      # Main router exports
│   └── student/
│       ├── index.ts                  # Student router exports
│       ├── routes.ts                 # Student routes configuration
│       └── StudentRouter.tsx         # Student router component
├── navigations/
│   └── students.navigation.ts        # Student navigation configuration
├── layouts/
│   └── students/
│       ├── layout.tsx                # Main student layout wrapper
│       └── sidebar.tsx               # Student navigation sidebar
├── pages/
│   └── students/
│       ├── index.tsx                 # Page component exports (no routing)
│       ├── Dashboard.tsx             # Main dashboard page
│       ├── AdaptiveLearning.tsx      # Adaptive learning page
│       ├── StudyBuddies.tsx          # Study buddies page
│       └── Progress.tsx              # Progress tracking page
├── views/
│   └── students/
│       └── AdaptiveLearning.tsx      # Reusable adaptive learning view
└── sections/
    └── students/
        └── adaptiveLearning/
            └── AdaptiveLearningSection.tsx  # Embedded adaptive learning section
```

## Router System

### Routes Configuration (`@routers/student/routes.ts`)
- Defines all student page routes
- Uses component names instead of JSX elements
- Easy to add new routes

### StudentRouter (`@routers/student/StudentRouter.tsx`)
- Renders student routes using React Router
- Lazy loads components for better performance
- Includes loading fallback
- Handles route mapping and rendering

### Usage in Main App
```tsx
import { StudentRouter } from "@/routers";

// In your main App.tsx or routing configuration
<Route path="/students/*" element={<StudentRouter />} />
```

## Navigation

The student navigation is configured in `src/navigations/students.navigation.ts` and includes:

- Dashboard
- Adaptive Learning
- Study Buddies
- Progress
- Skill Analysis
- Market Skills
- AI Career Counselor
- AI Educational Counselor
- Mock Interviews
- Job Recommendations
- Profile
- Resume Builder
- Mock Assessments

## Layout System

### StudentLayout
- Wraps all student pages
- Provides consistent sidebar navigation
- Includes AI Assistant component

### StudentSidebar
- Collapsible navigation sidebar
- Dynamic active tab highlighting
- Responsive design

## Pages

### Dashboard
- Overview of learning progress
- Current courses display
- Quick stats and achievements
- Course recommendations

### AdaptiveLearning
- AI-powered learning engine
- Personalized recommendations
- Learning analytics
- Progress tracking

### StudyBuddies
- Study partner management
- Buddy finding functionality
- Study session scheduling
- Connection requests

### Progress
- Learning milestones tracking
- Achievement system
- Skill progress visualization
- Monthly statistics

## Views

Views are reusable components that can be embedded in different contexts:

### AdaptiveLearningView
- Configurable header display
- Compact mode option
- Reusable across different pages

## Sections

Sections are smaller, focused components for embedding:

### AdaptiveLearningSection
- Compact adaptive learning overview
- Quick actions
- View details integration

## Usage

### Adding New Pages

1. Create the page component in `src/pages/students/`
2. Add the route to `src/routers/student/routes.ts`
3. Add the component to `src/routers/student/StudentRouter.tsx`
4. Add navigation item to `src/navigations/students.navigation.ts`

### Using Views

```tsx
import { AdaptiveLearningView } from "@/views/students/AdaptiveLearning";

<AdaptiveLearningView 
  learnerData={learnerData}
  showHeader={false}
  compact={true}
/>
```

### Using Sections

```tsx
import { AdaptiveLearningSection } from "@/sections/students/adaptiveLearning/AdaptiveLearningSection";

<AdaptiveLearningSection 
  learnerData={learnerData}
  onViewDetails={() => navigate('/students/adaptive-learning')}
  compact={true}
/>
```

## Benefits

- **Router Integration**: Uses proper `@routers/` folder structure
- **Lazy Loading**: Components are loaded only when needed
- **Separation of Concerns**: Each page has its own file and responsibility
- **Reusability**: Views and sections can be used across different contexts
- **Maintainability**: Clear structure makes it easier to find and modify code
- **Scalability**: Easy to add new pages and features
- **Navigation**: Proper routing with active tab highlighting
- **Layout Consistency**: All pages use the same layout wrapper

## Next Steps

To complete the setup:

1. **Update your main App.tsx** to include the new student router
2. **Test navigation** between the different pages
3. **Create the remaining pages** for all navigation items (I've created 4 out of 13)
4. **Update the old StudentDashboard.tsx** to use the new structure
5. **Add proper TypeScript interfaces** for all data structures

## Router Integration Example

```tsx
// In your main App.tsx
import { StudentRouter } from "@/routers";

function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/students/*" element={<StudentRouter />} />
      </Routes>
    </Router>
  );
}
```
