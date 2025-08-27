# API Integration for AI Assessment Creator

## Overview
The AI Assessment Creator has been integrated with the external API endpoints to provide real-time assessment generation capabilities.

## API Endpoints

### Base URL
```
http://4.161.43.78/assessments
```

### 1. Create Assessment Session
**Endpoint:** `POST /create-session`

**Payload:**
```json
{
  "assessment_type": "string",
  "topic": "string", 
  "difficulty": "string",
  "short_answer_count": "number",
  "mcq_count": "number",
  "true_false_count": "number"
}
```

**Response:**
```json
{
  "session_id": "string",
  "assessment_type": "string",
  "topic": "string",
  "difficulty": "string",
  "total_questions": "number",
  "short_answer_count": "number",
  "mcq_count": "number",
  "true_false_count": "number",
  "questions": []
}
```

### 2. Chat with AI
**Endpoint:** `POST /chat`

**Payload:**
```json
{
  "message": "string",
  "session_id": "string"
}
```

**Response:**
```json
{
  "message": "string",
  "complete": "boolean",
  "assessment_data": {
    "questions": [
      {
        "id": "string",
        "type": "string",
        "question": "string",
        "answer": "string",
        "explanation": "string",
        "answer_type": "string",
        "options": ["string"],
        "correct_answer": "string"
      }
    ],
    "title": "string",
    "description": "string",
    "instructions": "string",
    "time_limit": "string",
    "difficulty": "string",
    "total_points": "number"
  }
}
```

**Auto-Generation Behavior:**
When the response message contains "generate", the system automatically:
1. Sends the "generate" command to the API
2. Shows a loading state "Generating assessment..."
3. Processes the response with assessment_data
4. Displays the generated assessment

### 3. Get Assessment
**Endpoint:** `GET /sessions/{session_id}`

**Response:** Complete assessment with all questions and answers.

## Implementation Details

### Context Management
- **AssessmentContext**: Centralized state management for all assessment-related data
- **Session Management**: Handles creation, chat, and completion of assessment sessions
- **Form State**: Manages the initial assessment configuration form
- **Messages**: Tracks conversation between user and AI
- **UI State**: Controls form visibility, assessment view, and navigation

### Component Structure
- **AIAssessmentCreator**: Main component that orchestrates the entire assessment creation flow
- **Session Form**: Initial configuration form for assessment parameters
- **Chat Interface**: Real-time conversation with AI to build assessment
- **Assessment View**: Final generated assessment display
- **My Assessments**: Saved assessments management

### Key Features
1. **Session Creation**: Users configure assessment parameters and create a new session
2. **AI Chat**: Bilateral conversation with AI to refine and build the assessment
3. **Auto-Generation**: When AI suggests generation, automatically sends "generate" command
4. **Real-time Generation**: Assessment is generated as the conversation progresses
5. **Assessment Completion**: When assessment_data is received, final assessment is displayed
6. **Save & Manage**: Users can save assessments and view them later

### Auto-Generation Flow
The system intelligently detects when the AI is ready to generate an assessment:

1. **Detection**: Monitors chat responses for "generate" keyword
2. **Auto-Command**: Automatically sends "generate" command to API
3. **Loading State**: Shows "Generating assessment..." message
4. **Data Processing**: Extracts assessment_data from response
5. **Display**: Shows generated assessment with questions and explanations

### Manual Generation
Users can also manually type "generate" at any time to trigger assessment generation.

### Error Handling
- Network request failures are caught and displayed to users
- Graceful fallbacks for API errors
- Loading states during API calls

### State Flow
1. **Initial State**: Session form is displayed
2. **Session Created**: Chat interface becomes active
3. **Chat Phase**: User and AI exchange messages
4. **Completion**: Assessment is generated and displayed
5. **Save**: Assessment can be saved to local storage

## Usage

### Basic Flow
1. Navigate to Faculty Dashboard → Assessments tab
2. Fill out the assessment configuration form
3. Click "Create Session" to start
4. Chat with AI to build your assessment
5. When complete, review and save the assessment

### Configuration Options
- **Assessment Type**: Online Assessment, Quiz, Exam, Practice Test
- **Difficulty**: Easy, Medium, Hard
- **Question Types**: MCQ, Short Answer, True/False
- **Question Counts**: Configurable for each type

## Technical Notes

### Dependencies
- React Context API for state management
- Fetch API for HTTP requests
- TypeScript for type safety
- Tailwind CSS for styling

### Performance Considerations
- API calls are debounced to prevent excessive requests
- Loading states provide user feedback
- Efficient re-renders through context optimization

### Security
- No sensitive data is stored in the frontend
- API endpoints handle authentication and authorization
- Input validation on both client and server sides

## Future Enhancements
- Offline support for saved assessments
- Real-time collaboration features
- Advanced question type support
- Integration with learning management systems
- Analytics and reporting capabilities
