# Purano Kitab - Task Tracker

## Current Sprint Tasks

### Critical Issues 🔴

#### Task: Fix Google Login Text Rendering Error
- **ID**: TASK-001
- **Status**: ✅ Done
- **Priority**: CRITICAL
- **Assigned To**: Rahul
- **Sprint**: Phase 2 - Sprint 1
- **Description**: 
  - Issue: "text string must be rendered within a <Text> component"
  - Location: Auth flow after Google login
  - Impact: Google login flow breaks
- **Subtasks**:
  - [x] Identify exact component causing error
  - [x] Check for bare text rendering in success.tsx
  - [x] Check for error being rendered as plain text
  - [x] Add error boundaries
  - [x] Test auth flow end-to-end
- **Acceptance Criteria**:
  - [x] No console errors during auth flow
  - [x] Google login redirects successfully
  - [x] User data is fetched and stored correctly
  - [x] Redirect to protected page works
- **Notes**:
  - May be in BookLoader, Protected component, or auth context
  - Need full console error stack trace to debug

#### Task: Fix API Request Interceptor Issues
- **ID**: TASK-002
- **Status**: 🔄 In Progress
- **Priority**: HIGH
- **Assigned To**: Rahul
- **Sprint**: Phase 2 - Sprint 1
- **Description**:
  - Add retry logic for failed requests
  - Improve token refresh mechanism
  - Better error messages for users
- **Subtasks**:
  - [ ] Implement token refresh endpoint
  - [ ] Add retry logic with exponential backoff
  - [x] Improve error messages
  - [x] Add network error handling

---

### Feature Tasks 🟠

#### Task: Implement Search Functionality
- **ID**: TASK-003
- **Status**: ⏳ Planned
- **Priority**: HIGH
- **Assigned To**: [Unassigned]
- **Sprint**: Phase 2 - Sprint 2
- **Description**: Add full-text search for books
- **Subtasks**:
  - [ ] Create search API endpoint
  - [ ] Create search input component
  - [ ] Implement search results screen
  - [ ] Add search history
  - [ ] Add recent searches
- **Effort**: 8 hours
- **Acceptance Criteria**:
  - [ ] Search works with partial text matching
  - [ ] Results load within 500ms
  - [ ] Search history persists

#### Task: Add Book Category Filtering
- **ID**: TASK-004
- **Status**: ⏳ Planned
- **Priority**: HIGH
- **Assigned To**: [Unassigned]
- **Sprint**: Phase 2 - Sprint 2
- **Description**: Add filtering by category, condition, price range
- **Subtasks**:
  - [ ] Create filter UI component
  - [ ] Add category filter
  - [ ] Add condition filter
  - [ ] Add price range filter
  - [ ] Add sort options
- **Effort**: 6 hours

#### Task: Implement Payment Integration
- **ID**: TASK-005
- **Status**: ⏳ Planned
- **Priority**: HIGH
- **Assigned To**: [Unassigned]
- **Sprint**: Phase 2 - Sprint 3
- **Description**: Integrate Stripe/Razorpay for payments
- **Subtasks**:
  - [ ] Choose payment provider (Stripe/Razorpay)
  - [ ] Set up payment account
  - [ ] Implement payment UI
  - [ ] Add order management
  - [ ] Add invoice generation
  - [ ] Add transaction history
- **Effort**: 20 hours

#### Task: Build Messaging System
- **ID**: TASK-006
- **Status**: ⏳ Planned
- **Priority**: MEDIUM
- **Assigned To**: [Unassigned]
- **Sprint**: Phase 2 - Sprint 4
- **Description**: Implement user-to-user messaging
- **Subtasks**:
  - [ ] Design message schema
  - [ ] Create messaging API endpoints
  - [ ] Build chat UI
  - [ ] Add real-time updates (WebSocket)
  - [ ] Add message notifications
  - [ ] Add chat history
- **Effort**: 24 hours

#### Task: Add Rating & Review System
- **ID**: TASK-007
- **Status**: ⏳ Planned
- **Priority**: MEDIUM
- **Assigned To**: [Unassigned]
- **Sprint**: Phase 3 - Sprint 5
- **Description**: Implement user ratings and reviews
- **Subtasks**:
  - [ ] Design review data model
  - [ ] Create review API endpoints
  - [ ] Build review UI component
  - [ ] Add rating display
  - [ ] Add review filtering/sorting
  - [ ] Add verified purchase badge
- **Effort**: 12 hours

---

### Bug Fixes 🟡

#### Task: Fix Image Loading Performance
- **ID**: TASK-008
- **Status**: ⏳ Planned
- **Priority**: MEDIUM
- **Assigned To**: [Unassigned]
- **Sprint**: Phase 2 - Sprint 2
- **Description**: Optimize image loading and caching
- **Subtasks**:
  - [ ] Implement image caching
  - [ ] Add lazy loading
  - [ ] Optimize image sizes
  - [ ] Add loading placeholders

#### Task: Improve Error Handling
- **ID**: TASK-009
- **Status**: ✅ Done
- **Priority**: MEDIUM
- **Assigned To**: [Unassigned]
- **Sprint**: Phase 2 - Sprint 1
- **Description**: Add error boundaries and better error messages
- **Subtasks**:
  - [x] Create error boundary component
  - [x] Add global error handler
  - [x] Improve error messages
  - [x] Add error logging

---

### Testing & Documentation 🟢

#### Task: Add Unit Tests for Auth
- **ID**: TASK-010
- **Status**: ⏳ Planned
- **Priority**: MEDIUM
- **Assigned To**: [Unassigned]
- **Sprint**: Phase 2 - Sprint 1
- **Description**: Write unit tests for authentication flows
- **Subtasks**:
  - [ ] Test email login
  - [ ] Test Google login
  - [ ] Test token storage
  - [ ] Test protected routes
- **Effort**: 8 hours
- **Coverage Target**: > 80%

#### Task: Update Project Documentation
- **ID**: TASK-011
- **Status**: ✅ Done
- **Priority**: MEDIUM
- **Assigned To**: Rahul
- **Sprint**: Phase 2 - Sprint 1
- **Description**: Create comprehensive project docs
- **Subtasks**:
  - [x] Create docs folder structure
  - [x] Write project overview
  - [x] Document API design
  - [x] Write brainstorming document
  - [x] Create UI/UX guide
  - [x] Set up taskboard

---

## Completed Tasks ✅

| Task ID | Title | Sprint | Completed Date |
|---------|-------|--------|-----------------|
| TASK-011 | Update Project Documentation | Phase 2 S1 | 2026-04-08 |
| TASK-001 | Fix Google Login Text Rendering Error | Phase 2 S1 | 2026-04-25 |
| TASK-009 | Improve Error Handling | Phase 2 S1 | 2026-04-25 |

---

## Task Template

```markdown
#### Task: [Task Name]
- **ID**: TASK-XXX
- **Status**: ⏳ Planned / 🔄 In Progress / ✅ Done / 🔴 Blocked
- **Priority**: CRITICAL / HIGH / MEDIUM / LOW
- **Assigned To**: [Name]
- **Sprint**: [Phase/Sprint]
- **Description**: [What needs to be done]
- **Subtasks**:
  - [ ] Subtask 1
  - [ ] Subtask 2
- **Effort**: [Hours]
- **Acceptance Criteria**:
  - [ ] Criteria 1
  - [ ] Criteria 2
- **Notes**: [Additional notes]
```

---

## Legend

- 🔴 CRITICAL - Blocks deployment, users affected
- 🟠 HIGH - Important feature or bug
- 🟡 MEDIUM - Nice to have
- 🟢 LOW - Can be deferred

- ⏳ Planned - Not started
- 🔄 In Progress - Currently working on
- ✅ Done - Completed
- 🔴 Blocked - Waiting on something
