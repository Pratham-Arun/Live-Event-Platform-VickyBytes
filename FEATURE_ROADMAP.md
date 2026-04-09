# Feature Roadmap Ideas

This document proposes practical next steps for the Live Event Streaming frontend.

## 1) Core Product Features

### 1.1 User Accounts
- Sign up / login / logout flows
- Profile page with avatar, bio, and watch history
- Saved events and favorites sync per account

### 1.2 Event Discovery
- Multi-select filters (category, language, free/paid, date)
- Sort options (trending, soonest, most liked)
- Recommendation rail: “Because you watched …”

### 1.3 Event Detail Enhancements
- Host/speaker cards with social links
- Schedule timeline with chapters/segments
- Related events carousel

### 1.4 Real-time Interactions
- WebSocket-powered chat with presence indicator
- Message reactions (🔥 ❤️ 👏)
- Polls, Q&A upvoting, and pinned host messages

## 2) Streaming Experience Upgrades

### 2.1 Video Controls
- Theater mode, picture-in-picture, quality selector
- Playback speed and subtitles toggle
- Low-latency mode indicator

### 2.2 Engagement Metrics
- Live viewer count + trend sparkline
- Like burst animation when audience spikes
- “Clip this moment” quick action

### 2.3 Monetization Hooks
- Ticket tiers (free, premium, VIP)
- Tip/jar button during stream
- Sponsored banners with frequency caps

## 3) UI/UX Enhancements

### 3.1 Motion + Polish
- Staggered card entrance animations
- Skeleton loading states
- Interactive hover spotlight following cursor

### 3.2 Accessibility
- Keyboard shortcuts for player/chat
- Focus-visible states on all controls
- High contrast theme toggle + reduced motion support

### 3.3 Theming
- Category-based gradients across chips, CTA, and cards
- Light/dark/system mode
- Seasonal event themes (festivals, sports weeks)

## 4) Reliability + Developer Experience

### 4.1 State + Data
- Move static data to API routes or external CMS
- Add React Query/SWR caching and stale revalidation
- Optimistic UI for likes/chat send

### 4.2 Testing
- Unit tests for components and filter logic
- Playwright end-to-end tests (listing → detail → chat)
- Visual regression tests for responsive layouts

### 4.3 Observability
- Error boundary + logging integration
- Frontend analytics (views, watch time, CTA clicks)
- Performance budgets (LCP, CLS, INP)

## 5) Suggested Prioritized Backlog

### Phase 1 (High Impact / Low-Medium Effort)
1. Real backend chat via WebSocket service
2. Better filters + sorting + URL query sync
3. User auth + saved events
4. Loading/skeleton states and empty-state UX

### Phase 2 (Medium Effort)
1. Recommendation rail and related events
2. Host profiles and segment timeline
3. Player quality/subtitle controls

### Phase 3 (Advanced)
1. Monetization (tickets/tips)
2. AI highlights / auto chaptering
3. Multi-stream events with stage switching

## 6) “Wow” Features (Optional)
- Live co-watch rooms with invite links
- Real-time emoji rain overlays
- AI chat moderation and toxicity filter
- Auto-generated recap cards after event ends

