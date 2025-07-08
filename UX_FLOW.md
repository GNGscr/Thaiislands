# 🧭 UX Flow – ThaiIslands

This document outlines the **typical user journey** through the site, and how the design supports usability.

---

## 🚪 Landing Page (`/`)

- User is introduced to the site with a clean header and motion-based entrance.
- Top-right corner: language toggle (HE/EN)
- A central CTA leads to the island selector

- 💻 **Only on desktop:** 
  Clicking on each of the shuffling square (on the right), will lead user to blind selection.
  (Added for user's fun experience and engagement)

---

## 🏝️ Island Pages (`/koh-phangan`, `/koh-samui`, `/koh-tao`)

Each island page features:

- **Hero section** with imagery and title
- **Overview paragraphs** describing what to expect

- **Interactive Map:** 
  - Desktop **(hover)** or Mobile **(tap)** 
    on the map **(according to the displayed text)** will toggle google map 

- **Carousel of photos**
- **Hotels section** with:
  - Flip cards
  - Filter bar
  - Booking links

---

## 🏨 Hotel Interaction Flow

1. User clicks on a hotel card
2. Card flips with smooth animation
3. User can either:
   - Click **"Book now"** → opens external link
   - Click elsewhere on card → flips back

---

## 🎛️ Filter Interaction Flow

1. User opens filter dropdown
2. Selects a region
3. Hotel list updates instantly
4. Filter selection is reflected in the URL (`?region=north`)
5. Navigating back or sharing preserves filter state

---

## 🌍 Language Toggle Flow

1. User toggles language via navbar icon
2. Entire layout shifts (LTR ↔ RTL)
3. Animations and directionality adapt automatically

---

## 🔁 Scroll Behavior

- Scroll triggers:
  - Color transition in nav icons (white ↔ black)
  - Animated entrances for sections
  - Navbar tab highlighting (active tab tracking)

- Scroll in **Hotels** section:
  - Region name will stick to top until next region
  - Cards will be displayed with animation entrence

    **different animtions for desktop and mobile**

---

## 📱 Mobile Flow

- Tap-based side nav
- Large, easy-to-use buttons
- Sticky navigation
- Optimized layout stacking