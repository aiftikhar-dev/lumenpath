# Mock Assessments - Refactored Components

This directory contains the refactored MockAssessments component broken down into clean, reusable subcomponents.

## Structure

```
mockAssessments/
├── index.ts                           # Main exports
├── MockAssessmentsMain.tsx            # Main component orchestrator
├── AssessmentTypeCard.tsx             # Individual assessment type cards
├── AssessmentProgress.tsx             # Progress indicator during assessment
├── AssessmentQuestionCard.tsx         # Question display during assessment
├── AssessmentResultsCard.tsx          # Results and feedback display
├── PreviousResultsCard.tsx            # Previous assessment results
└── README.md                          # This file
```

## Components Overview

### Core Components

- **MockAssessmentsMain**: Main orchestrator component that manages the overall flow
- **AssessmentTypeCard**: Displays individual assessment types with start functionality
- **AssessmentProgress**: Shows progress and time remaining during assessment

### Assessment Interface Components

- **AssessmentQuestionCard**: Manages question display and answer selection
- **AssessmentResultsCard**: Shows results, feedback, and recommendations
- **PreviousResultsCard**: Displays previous assessment results and progress tracking

## Usage

The main component can be imported and used directly:

```tsx
import { MockAssessmentsMain } from "@/sections/students/mockAssessments";

// Use in your component
<MockAssessmentsMain />
```

Or import individual components for custom implementations:

```tsx
import { AssessmentTypeCard, AssessmentProgress } from "@/sections/students/mockAssessments";
```

## Data Structure

The component uses the following data types from `@/types/student/mock-assessments`:

- **AssessmentType**: Complete assessment type information
- **AssessmentQuestion**: Question details and options
- **AssessmentResult**: Results, feedback, and recommendations
- **AssessmentSession**: Current assessment session state

## Mock Data

Mock data is stored in `@/mock-data/student/mock-assessments` and includes:

- Assessment types (English, Personal, Technical)
- Sample questions for each assessment type
- Assessment results and feedback
- Learning recommendations

## Benefits of Refactoring

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be used independently in other parts of the app
3. **Maintainability**: Easier to debug and modify individual features
4. **Testing**: Each component can be tested in isolation
5. **Performance**: Better code splitting and lazy loading opportunities
6. **Clean Code**: Follows React best practices and modern patterns

## Component Features

### AssessmentTypeCard
- Displays assessment title, description, and metadata
- Shows duration, question count, difficulty, and category
- Gradient-colored icon backgrounds
- Start assessment button

### AssessmentProgress
- Real-time progress tracking with visual progress bar
- Countdown timer with automatic completion
- Question counter display
- Responsive design

### AssessmentQuestionCard
- Dynamic question type badges (Multiple Choice, Reading, Personality)
- Interactive answer selection with visual feedback
- Navigation controls (Exit, Next/Finish)
- Question type-specific styling

### AssessmentResultsCard
- Comprehensive results display with score/type
- Visual progress indicators
- Strengths and areas for improvement
- Personalized recommendations
- Download report functionality

### PreviousResultsCard
- Historical assessment performance tracking
- Visual indicators for each assessment type
- Quick access to detailed reports
- Progress monitoring over time

## Assessment Types

### English Assessment
- **Duration**: 30 minutes
- **Questions**: 25
- **Focus**: Grammar, vocabulary, reading comprehension
- **Scoring**: Percentage-based with level classification

### Personal Assessment
- **Duration**: 20 minutes
- **Questions**: 40
- **Focus**: Personality traits, work style, behavioral preferences
- **Scoring**: Personality type classification with trait analysis

### Technical Assessment
- **Duration**: 45 minutes
- **Questions**: 30
- **Focus**: Programming skills, problem-solving, technical knowledge
- **Scoring**: Percentage-based with skill area breakdown

## State Management

The main component manages:

- Assessment selection and initialization
- Question progression and answer tracking
- Timer management and auto-completion
- Results display and navigation
- Session cleanup and reset

## Customization

Each component accepts props for customization:

- Styling through className props
- Event handlers for custom behavior
- Data overrides for different use cases
- Responsive design considerations

## Future Enhancements

- Add more assessment types and categories
- Implement adaptive question difficulty
- Add real-time collaboration features
- Integrate with learning management systems
- Add detailed analytics and reporting
- Support for different languages and regions
- Implement spaced repetition algorithms
