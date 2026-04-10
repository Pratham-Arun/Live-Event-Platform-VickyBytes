# Live Event Platform: Feature & Enhancement Roadmap

This living document outlines concrete ideas tailored to evolving the platform across product capabilities, streaming UX, UI polish, accessibility, reliability, and observability.

---

## The "Quick Wins" (Top 5 Value Generators)
If you're looking for the highest impact-to-effort ratio, start with these top 5 features:

1. **Real-time WebSocket chat**: Migrate from React state to a true pub/sub WebSocket backend (e.g., Pusher, Socket.io) for live interaction.
2. **Better filtering/sorting with URL sync**: Push filter states to the URL (`?category=Tech&search=AI`) so users can share specific views.
3. **Auth + saved events**: Allow users to create accounts, "favorite" events, and build a customized schedule.
4. **Loading skeletons + stronger empty states**: Prevent layout shifts and make data fetching feel instantaneous with animated skeleton cards.
5. **Recommendation rail on detail/listing pages**: "You Might Also Like..." carousels based on the currently viewed category.

---

## Prioritized Implementation Plan

### Phase 1: Core UX & Reliability 
*Foundational upgrades to make the platform robust.*
- **Authentication**: JWT-based login (NextAuth / Stitch Auth).
- **URL State Management**: Sync filters, search queries, and selected tabs to routing.
- **Observability**: Integrate error tracking (Sentry) and basic Web Vitals monitoring to catch client-side crashes.
- **Accessibility Audit 1**: Ensure full keyboard navigation on Event Cards, focus rings on inputs, and ARIA labels on dynamic elements (like the ChatBox and Ticker).
- **Responsive Polish**: Ensure the new glass ChatBox handles mobile keyboards gracefully (viewport height adjustments).

### Phase 2: Live Stream Immersion 
*Features that make the video experience feel active and alive.*
- **WebSockets for Chat**: Build out a real-time messaging server.
- **Live Viewer Count Syncing**: Hook up the current viewer counts to live presence channels.
- **Video Player Upgrades**: Custom video controls, theater mode (expanding player, dimming background), and Picture-in-Picture (PiP) support.
- **Automated Testing**: Implement e2e tests (Playwright) covering the video selection and chat workflows.

### Phase 3: Community & Personalization 
*Long-term retention loops and social features.*
- **Saved Events / My List**: Persistent "Liked" events pinned to user profiles.
- **Notifications**: Push or email alerts when a favorited event goes "LIVE NOW".
- **Creator Profiles**: Clickable publisher avatars that list all upcoming events from that specific creator.
- **Analytics Dashboard for Hosts**: Let content creators see their peak concurrency and chat metrics.

---

## "Wow Features" (Differentiation)
*Optional, high-end mechanics to separate the platform from competitors.*

- **Co-Watch Rooms**: Let users create private instances of a public stream with their friends, piping in separate audio/video chat via WebRTC.
- **Emoji Overlays**: Floating heart/fire particle bursts on the edge of the video player when a user clicks the "Like" button rapidly.
- **AI Moderation**: An LLM-powered bot in the live chat that automatically masks toxicity and answers basic FAQ questions ("What time does the main event start?").
- **Recap Cards**: Auto-generated "Spotify Wrapped"-style carousels summarizing how many hours of events a user watched this month.

---

## Advanced Animation Playbook

> [!TIP]
> **Library Implementation Choices**: 
> - **Framer Motion**: Best for complex orchestration, layout transitions, and spring physics (currently in use).
> - **Motion One**: An alternative if bundle size becomes restrictive in the future.
> - **Lenis**: Integrate for buttery-smooth native scroll hijacking.

### The "Coolest" UI Suggestions
1. **Hero Mesh Gradient Animation + Staggered Card Reveal**: Replace the ambient orbs with an incredibly fluid, slow-morphing WebGL/Canvas mesh gradient, seamlessly transitioning into the cascading card entrance.
2. **3D Card Tilt + Poster Parallax + Border Beam**: Enhance the existing tilt cards with a moving "glowing border beam" that circles the card edge on hover, while pushing the thumbnail physically "deeper" into the Z-axis.
3. **Like Burst Particles + Synced Live Badge Glow**: When clicking the Like button, shoot out 15-20 localized SVG particles (confetti/stars) that follow physics paths.
4. **Cinematic Page Transitions + Theater Mode Spring**: Between viewing the homepage and an event detail page, use a shared-layout transition where the thumbnail expands smoothly to become the video player.
5. **Chat Message Enter Animation + Typing Indicator Wave**: Slide-up fade-in for messages (already implemented) plus a three-dot bouncing typing indicator for whenever *anyone* in the room is actively drafting.

### Guardrails (Performance & Accessibility)
> [!IMPORTANT]
> - **Transform/Opacity-First**: Ensure all animations *only* animate `transform` or `opacity` properties to prevent costly browser repaints/reflows. Avoid animating `width`, `height`, or `margin`.
> - **Reduced-Motion Support**: Check `window.matchMedia('(prefers-reduced-motion: reduce)')` natively or via toolings like Framer Motion's `useReducedMotion()` hook to disable intense animations (like the looping orb background or marquee) for sensitive users.
> - **Device Gating**: Disable heavy 3D-tilt or blur effects on specific low-end mobile user agents if frame drops are detected.
