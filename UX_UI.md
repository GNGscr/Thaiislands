# 🎨 UX/UI Principles – ThaiIslands

This document outlines the key **design**, **user experience**, and **interaction** principles applied in the development of [ThaiIslands](https://thaiislands.vercel.app).

---

## ✨ Visual Design

- **Minimalist layout**, with high contrast and clear typography.
- Use of **island-specific imagery** to create emotional engagement.
- **Color choices** dynamically adapt to the scroll position for better contrast and atmosphere.
- Designed to be **visually consistent** across devices.

---

## 📱 Mobile First

- Layout adapts fluidly to mobile screens.
- Side navigation responds to **tap gestures** rather than hover.
- **Sticky navbar** provides context even when scrolling.

---

## 🌍 Language and Directionality

- Full support for **Hebrew (RTL)** and **English (LTR)**.
- All UI elements (menus, alignment, transitions) switch direction accordingly.
- Context-aware layout that responds to text length and orientation.

---

## 🧭 Navigation

- **Sticky side navigation**, visible on hover (desktop) or tap (mobile).
- **Scroll-aware icon colors** (Instagram/Facebook) for optimal visibility.
- Page transitions are smooth, with contextual breadcrumbs and section highlights.

---

## 🏨 Hotels Section

- Each hotel card includes:
  - **Flip animation** for more information
  - **CTA button** to external booking site
  - **Click anywhere else** to flip back

- **Animated dropdown filter** by region:
  - Hotel list is filtered client-side
  - Current filter is persisted in URL params

---

## 🎞️ Animations & Motion

- Powered by **Framer Motion**
- Animations include:
  - Staggered fade-ins for page sections
  - Card flips on interaction
  - Animated navigation side menu
  - Smooth scroll-based reveals

---

## 🧩 Component Design

- UI built with **reusable modular components**
  - `TextParallaxSection`
  - `StickyImage`
  - `SwipeCarousel`
  - `HotelsSection`
- Clean separation of presentation and logic.
- Styled using **CSS Modules** and utility classes.

---

## ♿ Accessibility

- Semantic HTML used where possible.
- Navigation and buttons are keyboard-friendly (ongoing improvements planned).
- Color contrast meets WCAG baseline for key elements.

---

## 🧠 State and Behavior

- No Redux / Zustand — relies on:
  - **React Context API**
  - **URL search params** for filters
- Keeps the app stateless and shareable.