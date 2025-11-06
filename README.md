# ThaiIslands – UX-Oriented Project


ThaiIslands is a **full-stack**, multi-language web app showcasing Thailand’s top islands. Built from scratch with **React**, **Next.js**, **MongoDB**, **and a design-first approach.**

---

## Preview - Click image to view user flow

[![ThaiIslands Preview](./public/images/screenshot.png)](https://drive.google.com/file/d/17YnRiAfAXaKeGAVbot6ym4BNRcCVEUFT/view?usp=sharing)


**Live site:** [https://thaiislands.vercel.app](https://thaiislands.vercel.app)  
**Code:** [GitHub Repository](https://github.com/GNGscr/Thaiislands)

---

## Author

Created by **Daniel Ehrlich**, a **Full Stack Developer** (≈70% Frontend / 30% Backend) with a strong focus on user experience, visual consistency, and architectural clarity.  
Responsible for **ideation, design, UX planning, interface design, backend API, development, and frontend deployment** — fully end-to-end.

---

## UX/UI Documentation

 **1. UX/UI Overview:**
A `UX_UI.md` file summarizing all the UX and UI principles of the project — including design decisions, user flow, animations, accessibility focus, filtering, bilingual language support, and more.
- [UX/UI Principles](./UX_UI.md)

 **2. UX Walkthrough:**
An additional file, `UX_FLOW.md`, describing the user journey — what happens on the homepage, how the user navigates to the islands, how hotels are selected, what interactions are encountered along the way, etc.
- [User Flow Walkthrough](./UX_FLOW.md)

---

## UX Approach & Design Process

This project was planned and designed with a **UX-first mindset** — focusing on content hierarchy, clarity, and flow before starting development.

**These early sketches guided the visual structure, UX decisions, and component breakdown used in the final app.**

A `WIREFRAMES.md` file displaying all the wireframes for the project - **Desktop & Mobile**
- [Wireframes](./WIREFRAMS.md)

---

# Feature Overview

A fully responsive, UX-driven travel experience built with **Next.js**, **MongoDB**, and **Framer Motion**, focusing on performance, accessibility, and engaging microinteractions.

---

## Navigation & Structure

- **Multi-page SPA experience** using `slug`-based routing:
  - `/koh-phangan`, `/koh-samui`, `/koh-tao`, etc.
- **Sticky side navigation** with adaptive behavior:
  - On desktop: hover-based interaction.
  - On mobile: click/tap-based toggle.
- **Smooth scroll** and scroll-aware highlights to guide user flow.

---

## Language & Direction Support

- **Bilingual UI**: Hebrew & English.
- **Dynamic LTR/RTL direction** depending on selected language.
- Language toggle managed via **Context API** with persistent global state.

---

## Content & Data

- **Live data from MongoDB**:
  - Pulled via `Mongoose` inside Next.js API routes.
  - Each island page loads its relevant content dynamically.
- **Hotel section**:
  - Region-based filter.
  - Flipping hotel cards with extra info and affiliate links.
  - Animated dropdown for sorting/filtering.

---

## UI/UX & Animation

- **UX-focused layout**:
  - Clean typography and layout hierarchy.
  - Large tappable areas and mobile-first design principles.
- **Framer Motion animations**:
  - Section reveals, carousels, icon transitions, and hover effects.
  - Staggered entrance animations for better storytelling.
- **Microinteractions**:
  - Button feedback, carousel indicators, animated toggles.

---

## Responsiveness

- Responsive across:
  - Desktop 
  - Tablet (in progress)
  - Mobile 
- Elements reflow and resize based on screen size and orientation.

---

## ♿ Accessibility (A11y)

- **Semantic HTML** with structured headings and ARIA attributes (in progress).
- **Keyboard-accessible** interactive elements (focus states, skip links planned).
- **Reduced motion preferences** respected (if set by user).

---

## State & Logic

- **Global state management** via `Context API`:
  - Language toggle
  - UI filters

- **URL-based state**:
  - Stateless filtering for hotels (stored in query params, not in Redux/Zustand).
  - Supports bookmarking and shareable filter states.

---

## UX & Interactive Design Highlights

- **Scroll-based color transitions**:
  Navbar icons (Instagram, Facebook) change color dynamically based on scroll position, ensuring visibility across content sections.

- **Hotel cards with flip animations**:
  - Tapping a hotel card reveals a back-side with booking with a link button options
  - Tapping on it again (not on button) flips it back smoothly

- **Sticky region title**:
  Region name will stick to the top (under title) - until the next region name that will replace it.

- **Hotel filtering by region**:
  Filter buttons allow users to explore hotels by area (e.g. Baan tai, Haadrin, Thongsala), improving discoverability.

- **Language-aware layout**:
  LTR and RTL are fully supported, with mirrored animations and visual alignment for Hebrew/English.

- **Mobile side nav toggle**:
  Responsive sidebar with click behavior for mobile users (tap to expand/collapse).

- **Hover interactions**:
  Interactive elements across the app respond visually to hover and tap, with smooth Framer Motion transitions.


---


## Pages Overview

| Route         | Description                                |
|---------------|--------------------------------------------|
| `/`           | Landing page with intro and navigation     |
| `/koh-phangan`| Island overview (hero, gallery, hotels)    |
| `/koh-samui`  | Alternate structure for Koh Samui          |
| `/koh-tao`    | Koh Tao content                            |
| `/about`      | Project background and travel notes        |

Each page pulls data **live from MongoDB**, rendered dynamically via SSR/ISR.

---

## Stack & Technologies

| Layer       | Technology                         |
|------------|-------------------------------------|
| Frontend   | React 18, Next.js, Framer Motion    |
| Backend    | MongoDB Atlas, Mongoose             |
| Styling    | Tailwind CSS + CSS Modules          |
| State      | React Context API                   |
| Deployment | Vercel                              |
| Assets     | Optimized images, lazy loading      |
| Animation  | Framer Motion                       |
| i18n       | Built-in language support (HE/EN)   |

---

## Project Structure

```bash
Thaiislands/
├── public/              # Static assets (images, favicon)
├── src/
│   ├── components/      # Modular UI components
│   ├── data/            # Island-specific content
│   ├── hooks/           # Custom React hooks
│   ├── layout/          # Page layout structure
│   ├── pages/           # Next.js routes
│   └── styles/          # CSS modules and global styles
├── .env.local           # Environment variables
└── package.json         # Dependencies and scripts
```

---


## Key Architectural Choices

- **No Redux or Zustand**: All state management is handled via URL params + Context API to minimize overhead and encourage stateless behavior.
- **Accessible-first**: All interactive elements are progressively enhanced and aim to support keyboard use (some work remains).
- **Design-led development**: UX wireframes and visual structure defined before code, ensuring consistency.
- **Component reusability**: Typography, cards, buttons, and layouts extracted and reused across pages.

---

## Languages & Directionality

- Supports **Hebrew** and **English** with `dir="rtl"`/`ltr` rendering
- Text, layouts, and animations adapt to language choice
- Toggle available in top-right menu
    - also displays animation to reflect the change

---


## Deployment

- Hosted live on **[Vercel](https://vercel.com/)** with:
  - Image optimization
  - Dynamic routing
  - Incremental static regeneration (planned)


---


## Installation & Running Locally

> Requires: Node.js 18+, npm or yarn, and a MongoDB Atlas connection

1. **Clone the repo**
```bash
git clone https://github.com/GNGscr/Thaiislands.git
cd Thaiislands
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**  
Create a `.env.local` file at the root with your MongoDB URI:

```
MONGODB_URI=your-mongodb-connection-string
```

4. **Run the dev server**
```bash
    npm run dev
    # or
    yarn dev
```

The app will run on `http://localhost:3000`.

---

## Possible Improvements (Not included in current version)

- Lighthouse score optimization (accessibility, performance)
- Tests with Jest or Cypress
- Improved skeleton loading during SSR
- Meta tags (OG, SEO per page)

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

For contact, feedback, suggestions or collaboration: 
  - [LinkedIn](https://linkedin.com/in/daniel-ehrlich-36a389136) 
  - [Emails]: 
    - [Private Email][ehrlichdaniel1@gmail.com]
    - [Work Email][de.brand808@gmail.com]