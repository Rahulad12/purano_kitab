# Purano Kitab - Product Roadmap

## Release Timeline

### Phase 1: Core MVP ✅ (Completed)
- User authentication (email + Google OAuth)
- Book listing and browsing
- Basic user profile
- Favorites functionality
- Protected routes

### Phase 2: Enhanced Features 🔄 (Current - Q1 2026)
- [ ] Advanced search and filtering
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] In-app messaging
- [ ] Order management
- [ ] Rating and reviews system
- [ ] Fix Text rendering error in auth flow

### Phase 3: Community & Social ⏳ (Q2 2026)
- [ ] User reviews and ratings
- [ ] Follow sellers
- [ ] Notifications system
- [ ] User activity feed
- [ ] Book discussions/comments

### Phase 4: Seller Tools 📅 (Q3 2026)
- [ ] Seller analytics dashboard
- [ ] Bulk listing management
- [ ] Inventory tracking
- [ ] Sales analytics
- [ ] Automated pricing suggestions

### Phase 5: Advanced Features 🎯 (Q4 2026)
- [ ] AI-based recommendations
- [ ] Wishlist notifications
- [ ] Subscription plans
- [ ] Admin dashboard
- [ ] Content moderation tools

---

## Current Sprint (Sprint 1 - Week 1-2)

### Priority: HIGH
- [ ] Fix Google login text rendering error
- [ ] Implement error boundaries in app
- [ ] Add API error handling improvements
- [ ] Add unit tests for auth flow

### Priority: MEDIUM
- [ ] Implement search functionality
- [ ] Add book category filtering
- [ ] Improve book card UI
- [ ] Add empty state screens

### Priority: LOW
- [ ] Optimize images
- [ ] Add animations
- [ ] Improve documentation

---

## Upcoming Milestones

### Milestone 1: Payment Integration
- **Target Date**: End of Q1 2026
- **Deliverables**:
  - Stripe integration
  - Payment processing
  - Order confirmation
  - Receipt generation

### Milestone 2: Beta Release
- **Target Date**: Mid Q2 2026
- **Deliverables**:
  - Stable app release
  - 100+ active users
  - Bug fixes from user feedback
  - Performance optimizations

### Milestone 3: V1.0 Production Release
- **Target Date**: End of Q2 2026
- **Deliverables**:
  - Full feature set
  - Performance optimized
  - Security audit completed
  - App store submission

---

## Feature Breakdown

### Search & Filtering
**Effort**: Medium | **Priority**: High | **Sprint**: Phase 2
- Full-text search
- Filter by category, author, price range
- Sort options
- Search history
- Recent searches

### Payment System
**Effort**: Large | **Priority**: High | **Sprint**: Phase 2
- Stripe/Razorpay integration
- Payment processing
- Refund handling
- Invoice generation
- Transaction history

### Messaging System
**Effort**: Large | **Priority**: High | **Sprint**: Phase 2
- User-to-user messaging
- Message notifications
- Chat history
- Image sharing in messages
- Message search

### Rating & Reviews
**Effort**: Medium | **Priority**: Medium | **Sprint**: Phase 3
- Book ratings (1-5 stars)
- Review text with images
- Seller ratings
- Review filtering
- Verified purchase badges

### Analytics Dashboard (Seller)
**Effort**: Large | **Priority**: Medium | **Sprint**: Phase 4
- Sales charts
- Views analytics
- Popular books
- Revenue tracking
- Customer insights

---

## Known Issues & Fixes

| Issue | Status | Priority | Sprint |
|-------|--------|----------|--------|
| Google login text rendering error | 🔄 In Progress | HIGH | Phase 2 |
| API timeout on slow networks | ⏳ Planned | MEDIUM | Phase 2 |
| Image upload size limits | ✅ Done | LOW | Phase 1 |

---

## Dependencies

```
Phase 1 ✅
    ↓
Phase 2 (Payment, Messaging, Reviews)
    ↓
Phase 3 (Community features)
    ↓
Phase 4 (Seller tools, Analytics)
    ↓
Phase 5 (AI features, Advanced)
```

---

## Success Metrics

- User retention: > 60% after 7 days
- App crash rate: < 0.1%
- API response time: < 500ms p95
- User satisfaction: > 4.0 stars
- Books listed: > 1000 per week

---

## Notes

- All phases are subject to change based on user feedback
- Performance and security are priorities across all phases
- Community engagement is key to long-term success
- Consider market feedback before Phase 3
