# Purano Kitab - Sprint Planning & Retrospectives

## Active Sprint

### Phase 2 - Sprint 1: "Bug Fixes & Stability"
**Duration**: April 6 - April 19, 2026 (2 weeks)
**Goal**: Fix critical bugs, improve error handling, and prepare for Phase 2 features

#### Sprint Planning

##### Goal Statement
Fix critical issues from Phase 1, establish error handling infrastructure, and lay groundwork for Phase 2 features.

##### Priority Features/Fixes
1. **CRITICAL**: Fix text rendering error in auth flow
2. **HIGH**: Implement error boundaries
3. **HIGH**: Improve API error handling
4. **MEDIUM**: Add unit tests for auth flow
5. **MEDIUM**: Optimize image loading

##### Story Points Estimation
- TASK-001: 5 points (complex debugging)
- TASK-002: 3 points (interceptor improvements)
- TASK-009: 3 points (error handling)
- TASK-010: 4 points (unit tests)
- Total: 15 points

##### Team Capacity
- Rahul: 20 hours/week
- Estimated Velocity: 15 points (based on Phase 1)

##### Sprint Backlog

```
HIGH PRIORITY:
- [ ] TASK-001: Fix Google login text rendering error (5 pts)
- [ ] TASK-002: Fix API request interceptor issues (3 pts)
- [ ] TASK-009: Improve error handling (3 pts)

MEDIUM PRIORITY:
- [ ] TASK-010: Add unit tests for auth (4 pts)
- [ ] TASK-008: Fix image loading performance (2 pts)

STRETCH GOALS (if time allows):
- [ ] TASK-003: Implement search functionality (8 pts)
```

##### Daily Standup Format
```
What I did yesterday:
- ...

What I'm doing today:
- ...

Blockers:
- ...
```

##### Acceptance Criteria (Sprint Done)
- [ ] All CRITICAL tasks resolved
- [ ] Unit tests pass
- [ ] Code review approved
- [ ] Documentation updated
- [ ] No new console errors
- [ ] App doesn't crash on auth flow

---

## Previous Sprints

### Phase 1 - Sprint 1: "Core MVP Setup"
**Duration**: March 15 - April 5, 2026 (3 weeks)
**Status**: ✅ Completed
**Velocity**: 25 points

#### Sprint Goal
Build core authentication and basic book listing functionality.

#### Completed Tasks
- ✅ User email login/registration
- ✅ Google OAuth integration
- ✅ Protected routes setup
- ✅ Book listing display
- ✅ User profile basics
- ✅ Favorites functionality

#### Sprint Retrospective

##### What Went Well 👍
1. **Good Planning**: Sprint goals were clear and achievable
2. **Solid Architecture**: Protected routes work well
3. **User Authentication**: OAuth integration smooth
4. **Code Quality**: TypeScript helped catch errors early

##### What Didn't Go Well 👎
1. **Token Timing Issue**: Race condition in token storage/retrieval
   - Impact: Google login redirect broken initially
   - Lesson: Always handle async operations carefully

2. **Missing Error Handling**: No error boundaries
   - Impact: Text rendering error appeared late
   - Lesson: Add error boundaries early

3. **Insufficient Testing**: No unit tests written
   - Impact: Issues found in production
   - Lesson: Write tests alongside features

##### Improvements for Next Sprint 📈
1. Implement error boundaries before other features
2. Add comprehensive error handling
3. Write unit tests as part of definition of done
4. Add console error monitoring
5. Better async handling with proper loading states

##### Velocity Metrics
- Stories Completed: 6
- Total Points: 25
- Average Points/Story: 4.2
- Actual vs Planned: ✅ On Target
- Burndown: Healthy (slight delays mid-sprint due to debugging)

---

## Sprint Templates

### New Sprint Planning Template

```markdown
### [Phase] - Sprint [N]: "[Sprint Name]"
**Duration**: [Date] - [Date] ([weeks])
**Goal**: [One-line goal]

#### Sprint Planning

##### Goal Statement
[Detailed goal description]

##### Priority Features/Fixes
1. 
2.
3.

##### Story Points Estimation
- TASK-XXX: N points
- Total: N points

##### Team Capacity
- [Person]: [hours/week]
- Estimated Velocity: N points

##### Sprint Backlog
```

### Retrospective Template

```markdown
#### Sprint Retrospective

##### What Went Well 👍
1.
2.

##### What Didn't Go Well 👎
1.
2.

##### Improvements for Next Sprint 📈
1.
2.

##### Velocity Metrics
- Stories Completed: N
- Total Points: N
- Average Points/Story: N
- Actual vs Planned: 
- Burndown: 
```

---

## Story Points Reference

### Point Scale (Fibonacci)
```
1 point  = 30 min - 1 hour work (trivial)
2 points = 1-2 hours work (simple)
3 points = 2-4 hours work (small)
5 points = 4-8 hours work (medium)
8 points = 8-16 hours work (large)
13 points = 16+ hours work (very large - should be broken down)
```

### Effort vs Points Example
```
"Add button to screen" = 1-2 points
"Create new component" = 3-5 points
"Implement feature with API call" = 5-8 points
"Build complex feature from scratch" = 8-13 points
```

---

## Sprint Calendar

```
Phase 1: March 15 - April 5 (3 weeks) ✅ COMPLETE
   └─ Sprint 1: Core MVP Setup

Phase 2: April 6 - May 17 (6 weeks)
   ├─ Sprint 1: Bug Fixes & Stability (Apr 6-19)
   ├─ Sprint 2: Search & Filtering (Apr 20 - May 3)
   └─ Sprint 3: Payment Integration (May 4-17)

Phase 3: May 18 - June 28 (6 weeks)
   ├─ Sprint 4: Messaging System
   ├─ Sprint 5: Rating & Reviews
   └─ Sprint 6: Community Features

Phase 4: June 29 - August 9 (6 weeks)
   └─ Seller Analytics & Tools

Phase 5: August 10 - September 20 (6 weeks)
   └─ Advanced Features & AI
```

---

## Sprint Ceremony Schedule

### Daily Standup
- **Time**: 9:30 AM (15 min)
- **Format**: Async or Sync
- **Attendance**: All team members

### Sprint Planning
- **Time**: Start of sprint (2 hours)
- **Attendees**: Dev team, Product owner
- **Output**: Sprint backlog, story points

### Sprint Review
- **Time**: End of sprint (1.5 hours)
- **Attendees**: All stakeholders
- **Output**: Demo of completed work

### Sprint Retrospective
- **Time**: End of sprint (1 hour)
- **Attendees**: Dev team
- **Output**: Action items for next sprint

---

## Definition of Done

A story is done when:
- [ ] Code is written and tested locally
- [ ] Code review completed and approved
- [ ] Unit tests written (if applicable)
- [ ] Manual testing completed
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Performance benchmarks met
- [ ] Code merged to main branch

---

## Release Notes Template

```markdown
## Version X.Y.Z - [Release Date]

### New Features
- Feature 1
- Feature 2

### Bug Fixes
- Bug fix 1
- Bug fix 2

### Improvements
- Improvement 1
- Improvement 2

### Known Issues
- Issue 1
- Issue 2

### Contributors
- Name
```
