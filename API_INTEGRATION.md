# AI Career Counselor, Educational Counselor & Course Generator API Integration

## Overview
All three AI components have been updated to integrate with backend APIs for real-time functionality using React Context to avoid loop issues and provide better state management.

## Architecture

### Context Providers
- **`CareerCounselorProvider`**: Manages career counseling sessions and API calls
- **`EducationalCounselorProvider`**: Manages educational counseling sessions and API calls
- **`CourseGeneratorProvider`**: Manages course generation sessions and API calls

### Key Benefits
- **No Loop Issues**: Uses `useCallback` and proper dependency management
- **Centralized State**: Messages, session, and loading states managed in context
- **Reusable**: Can be used across multiple components
- **Better Performance**: Prevents unnecessary re-renders
- **Auto-scroll**: Chat automatically scrolls to bottom on new messages

## API Endpoints

### Career Counselor API
**Base URL**: `http://4.161.43.78/career-counselor`

#### 1. Create Default Session
- **Endpoint**: `/sessions/default`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Response**:
  ```json
  {
    "session_id": "string",
    "message": "string"
  }
  ```

#### 2. Chat Message
- **Endpoint**: `/sessions/{session_id}/chat`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "session_id": "string",
    "message": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "string"
  }
  ```

### Educational Counselor API
**Base URL**: `http://4.161.43.78/educational-counselor`

#### 1. Create Default Session
- **Endpoint**: `/sessions/default`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Response**:
  ```json
  {
    "session_id": "string",
    "message": "string"
  }
  ```

#### 2. Chat Message
- **Endpoint**: `/sessions/{session_id}/chat`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "session_id": "string",
    "message": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "string"
  }
  ```

### Course Generator API
**Base URL**: `http://4.161.43.78/courses`

#### 1. Start Session
- **Endpoint**: `/start-session`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Response**:
  ```json
  {
    "session_id": "string",
    "message": "string"
  }
  ```

#### 2. Answer Question
- **Endpoint**: `/answer-question`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "session_id": "string",
    "answer": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "string",
    "next_question": "string",
    "is_complete": "boolean"
  }
  ```

#### 3. Get Generated Course
- **Endpoint**: `/get-course/{session_id}`
- **Method**: `GET`
- **Headers**: `Content-Type: application/json`
- **Response**:
  ```json
  {
    "course": "object",
    "message": "string"
  }
  ```

### Course Response Structure

The `/get-course/{session_id}` endpoint returns a rich course object:

```json
{
  "session_id": "9bb0bada-bf79-4814-adbd-966733547e3f",
  "course": {
    "course_title": "Food Delivery App Onboarding: Complete Setup and Your First Order",
    "course_description": "A blended onboarding course for everyday end users...",
    "modules": [
      {
        "module_name": "Introduction",
        "module_description": "Overview of the app, who this course is for...",
        "content": "Who this is for:\n- New customers and everyday end users...",
        "questions": [
          {
            "question": "What is the most important first step...",
            "options": ["Enable dark mode", "Create an account...", ...],
            "correct_answer": "B",
            "explanation": "You need a verified account to place an order..."
          }
        ]
      }
    ]
  },
  "filename": "courses/food_delivery_app_onboarding.json"
}
```

### Course Display Features

The Course Generator now displays:
- **Course Overview**: Title, description, and metadata
- **Module Structure**: Each module with name, description, and content
- **Assessment Questions**: Interactive quiz questions with explanations
- **Rich Content**: Formatted content with proper whitespace handling
- **Action Buttons**: Edit, finalize, or create new course options

## How It Works

1. **Context Initialization**: Each provider automatically creates a session when mounted
2. **Session Management**: Stores session ID and manages API calls
3. **Message Handling**: All messages are managed through context functions
4. **State Persistence**: Messages and session state persist across component re-renders
5. **Auto-scroll**: Chat automatically scrolls to bottom when new messages arrive
6. **Course Generation**: Interactive Q&A flow that builds course requirements

## Usage

### 1. Wrap Components with Providers
```tsx
import { CareerCounselorProvider } from "@/contexts/CareerCounselorContext";
import { EducationalCounselorProvider } from "@/contexts/EducationalCounselorContext";
import { CourseGeneratorProvider } from "@/contexts/CourseGeneratorContext";

{/* Career Counselor */}
<CareerCounselorProvider>
  <AICareerCounselor />
</CareerCounselorProvider>

{/* Educational Counselor */}
<EducationalCounselorProvider>
  <AIEducationalCounselor />
</EducationalCounselorProvider>

{/* Course Generator */}
<CourseGeneratorProvider>
  <CourseGenerator />
</CourseGeneratorProvider>
```

### 2. Use Context in Components
```tsx
// Career Counselor
import { useCareerCounselor } from "@/contexts/CareerCounselorContext";
const { messages, isInitializing, isLoading, error, addMessage, sendMessage, clearError } = useCareerCounselor();

// Educational Counselor
import { useEducationalCounselor } from "@/contexts/EducationalCounselorContext";
const { messages, isInitializing, isLoading, error, addMessage, sendMessage, clearError } = useEducationalCounselor();

// Course Generator
import { useCourseGenerator } from "@/contexts/CourseGeneratorContext";
const { messages, isInitializing, isLoading, error, isComplete, generatedCourse, addMessage, sendAnswer, getGeneratedCourse, clearError } = useCourseGenerator();
```

## Context Functions

### Career & Educational Counselor Contexts
- **`addMessage(message)`**: Add a new message to the chat
- **`sendMessage(userMessage)`**: Send message to API and get AI response
- **`resetSession()`**: Reset the current session and start fresh
- **`clearError()`**: Clear any error messages

### Course Generator Context
- **`addMessage(message)`**: Add a new message to the chat
- **`sendAnswer(answer)`**: Send answer to API and get next question
- **`getGeneratedCourse()`**: Retrieve the generated course
- **`setCurrentStep(step)`**: Manually set the current step
- **`resetSession()`**: Reset the current session and start fresh
- **`clearError()`**: Clear any error messages

## Features

- **Real-time Chat**: Bilateral conversation between user and AI
- **Session Management**: Each user gets a unique session ID
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful fallbacks and retry options
- **Quick Questions**: Pre-defined questions that can be clicked to start conversations
- **State Persistence**: Messages and session state maintained across re-renders
- **Auto-scroll**: Chat automatically scrolls to show latest messages
- **Course Generation**: Interactive Q&A flow for course creation
- **Progress Tracking**: Visual progress indicators during generation
- **Step Management**: Automatic step transitions based on completion status

## Error Handling

All contexts provide comprehensive error handling:
- **API Failures**: Fallback messages and retry options
- **Session Issues**: Automatic fallback to mock responses
- **Network Problems**: User-friendly error messages with dismiss/retry options

## Debugging

Console logs are added to help debug:
- Session initialization success/failure
- Message sending and receiving
- API response content
- Course generation progress

## Fallback Behavior

If the API is unavailable, all components will:
1. Show a fallback welcome message
2. Display error notifications with dismiss/retry options
3. Continue to function with mock responses for user experience

## Performance Optimizations

- **useCallback**: Prevents function recreation on every render
- **Context Optimization**: Only re-renders components that actually use the context
- **State Batching**: Efficient state updates to prevent unnecessary re-renders
- **Auto-scroll**: Smooth scrolling without performance impact
- **AbortController**: Prevents infinite loops and cancels outdated API requests
- **Ref-based State Tracking**: Uses refs to prevent unnecessary re-renders during initialization

## Auto-scroll Implementation

All chat interfaces automatically scroll to the bottom when:
- New user messages are added
- AI responses are received
- Loading states appear
- Quick questions are clicked

This provides a seamless user experience without manual scrolling.

## AbortController Implementation

### Problem Solved
The Course Generator context was experiencing infinite loops due to:
- **useEffect Dependencies**: The `initializeSession` function was being recreated on every render
- **Multiple API Calls**: Multiple simultaneous requests could cause race conditions
- **Memory Leaks**: Ongoing requests weren't properly cancelled

### Solution Implemented
- **AbortController**: Each API request uses an AbortController to cancel previous requests
- **Ref-based Tracking**: Uses `useRef` to track initialization state without causing re-renders
- **Single Initialization**: Session is only initialized once using an empty dependency array
- **Request Cancellation**: New requests automatically cancel ongoing ones

### How It Works
```typescript
// Abort any existing request before making a new one
if (abortControllerRef.current) {
  abortControllerRef.current.abort();
}

// Create new abort controller for current request
abortControllerRef.current = new AbortController();

// Use the signal in fetch requests
const response = await fetch(url, {
  signal: abortControllerRef.current.signal
});
```

### Benefits
- **No More Infinite Loops**: Session initialization only happens once
- **Better Performance**: Cancels outdated requests automatically
- **Memory Safety**: Prevents memory leaks from abandoned requests
- **Race Condition Prevention**: Only the latest request completes
- **Clean Component Lifecycle**: Proper cleanup on unmount

## Course Generation Flow

The Course Generator follows a specific flow:
1. **Session Start**: Initialize session and get welcome message
2. **Interactive Q&A**: User answers questions one by one
3. **Progress Tracking**: Visual feedback for each completed question
4. **Course Generation**: API generates course based on collected answers
5. **Course Retrieval**: Fetch and display the generated course
6. **Content Enhancement**: Option to generate full content and assessments

### Step Management

The context automatically manages the current step:
- **"chat"**: Initial state for Q&A interaction
- **"generating"**: Course generation in progress
- **"completed"**: Course generation completed, ready for review
- **"courseCreated"**: Course has been published and deployed

Steps automatically transition based on:
- **API Completion**: When `is_complete: true` is received, step changes to "completed"
- **Manual Control**: Components can manually set steps using `setCurrentStep()`
- **Session Reset**: Resetting session returns to "chat" step
