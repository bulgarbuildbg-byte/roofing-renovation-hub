

# Plan: Add AI Chatbot for Roofing Website

## Overview

Add a floating AI chatbot that can answer customer questions about roofing services, pricing, and help schedule consultations. The chatbot will be powered by Lovable AI and appear as a floating widget in the bottom-right corner of the website.

## Features

- **Floating chat button** - Appears on all pages, opens chat dialog
- **AI-powered responses** - Answers questions about roofing services in Bulgarian
- **Streaming responses** - Real-time token-by-token display for better UX
- **Conversation history** - Maintains context within session
- **Quick action buttons** - Pre-defined questions for common inquiries
- **Mobile responsive** - Works well on both desktop and mobile

## User Experience

1. User sees a chat icon in the bottom-right corner
2. Clicking opens a chat dialog with welcome message
3. User can type questions or click quick action buttons
4. AI responds with helpful information about services
5. Chat can suggest booking a free inspection

## Technical Implementation

### Step 1: Enable Lovable Cloud
- Set up Lovable Cloud backend infrastructure
- This provides the Supabase environment and LOVABLE_API_KEY

### Step 2: Create Edge Function
Create `supabase/functions/chat/index.ts`:
- Receives user messages from frontend
- Adds system prompt with roofing company context (services, pricing, contact info)
- Calls Lovable AI Gateway with streaming enabled
- Returns SSE stream to frontend

### Step 3: Install Dependencies
- `react-markdown` - For rendering AI responses with formatting

### Step 4: Create Chat Components

**New files:**
- `src/components/ChatBot.tsx` - Main chat widget component
- `src/components/ChatMessage.tsx` - Individual message display
- `src/hooks/useChat.ts` - Chat state management and streaming logic

### Step 5: Integrate into App
- Add ChatBot component to Index.tsx (and other pages as needed)
- Position as floating widget that doesn't interfere with existing FloatingCallButton

## Component Structure

```text
┌─────────────────────────────────────┐
│  ChatBot.tsx                        │
│  ├── Floating trigger button        │
│  ├── Chat dialog (when open)        │
│  │   ├── Header with title/close    │
│  │   ├── Messages area (scrollable) │
│  │   │   └── ChatMessage.tsx        │
│  │   ├── Quick action buttons       │
│  │   └── Input form                 │
│  └── useChat hook for state/API     │
└─────────────────────────────────────┘
```

## AI System Prompt Context

The AI will be configured with knowledge about:
- Company services (roof repair, waterproofing, tile replacement, etc.)
- Service areas (Varna region)
- Contact information (phone, email, address)
- Working hours
- General pricing guidance
- Ability to recommend scheduling a free inspection

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `supabase/functions/chat/index.ts` | Create | Edge function for AI chat |
| `supabase/config.toml` | Create | Supabase configuration |
| `src/components/ChatBot.tsx` | Create | Main chat widget |
| `src/components/ChatMessage.tsx` | Create | Message bubble component |
| `src/hooks/useChat.ts` | Create | Chat logic and streaming |
| `src/pages/Index.tsx` | Modify | Add ChatBot component |
| `package.json` | Modify | Add react-markdown dependency |

## Estimated Scope

- 1 edge function
- 3 new React files
- 2 file modifications
- 1 new dependency

