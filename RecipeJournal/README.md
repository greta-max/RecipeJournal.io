# 🍳 Sweet & Savory Kitchen

| Field | Details |
|---|---|
| **Student Name** | [YOUR NAME] |
| **Website Category** | Food / Recipe |
| **Technologies** | HTML5, CSS3, Vanilla JavaScript, localStorage, JSON |

---

## 📖 Project Description

**Sweet & Savory Kitchen** is a fully responsive, multi-page recipe website built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no backend. It features a warm light-pink aesthetic with Google Fonts (Poppins + Playfair Display), clean card-based layouts, and smooth animations. Users can browse savoury cooking recipes and sweet baking recipes, search and filter by category, view detailed recipe modals, and save their favourite dishes to a personal collection — all powered by `localStorage`.

---

## ✨ Main Features

### 🏠 Cover Page (`index.html`)
- Full-viewport hero section with background image, site title, tagline, and CTA buttons
- Feature highlight cards (intro section)
- Preview of popular recipes
- Fully responsive sticky navbar with hamburger menu

### 🥘 Cooking Page (`cooking.html`)
- Dynamic grid of **10 savoury main-dish** recipe cards rendered from a JS data array
- Real-time search bar filtering by dish name as the user types
- Category filter buttons: Chicken, Beef, Pasta, Seafood, Vegetarian
- "No recipes found" message when no results match

### 🧁 Baking Page (`baking.html`)
- Dynamic grid of **10 baking/dessert** recipe cards
- Real-time search and category filters: Cakes, Cookies, Bread, Brownies, Pastry

### 🔍 Recipe Cards & Modal
- Each card shows only the dish photo and name (clean, minimal)
- Click any card to open a **modal popup** showing:
  - Large recipe photo
  - Prep time, cook time, servings
  - Full ingredients list
  - Numbered step-by-step instructions
- Modal closes via ✕ button, clicking the backdrop, or pressing `Escape`
- **"Save to Favorites"** heart button inside the modal (requires login)

### 🔐 Login / Register Page (`auth.html`)
- Tab-based toggle between Login and Register forms
- **Register validation:** required fields, valid email format, password ≥ 6 characters, passwords must match, no duplicate email
- **Login validation:** credential check against `localStorage`
- Session stored in `localStorage`; navbar shows "Hi, [Name]" + Logout button when logged in
- Redirects already-logged-in users away from the auth page

### ❤️ Favorites Page (`favorites.html`)
- Protected route — redirects to login if not authenticated
- Displays the logged-in user's saved recipes in the same card/modal layout
- Per-user favorites stored in `localStorage` (keyed by email)
- Friendly empty state with links to recipe pages

### 🍞 Extra Features
- **Toast notifications** for login, logout, save/unsave actions
- **Smooth hover animations** on cards (lift + image scale), buttons (lift + glow)
- **Fully responsive** — mobile, tablet, desktop layouts
- **Hamburger menu** on small screens
- Accessible HTML: `aria-*` attributes, `role`, keyboard navigation (Enter/Space on cards)
- No console errors

---

## 📁 Project Structure

```
sweet-savory-kitchen/
│
├── index.html          # Cover / home page
├── cooking.html        # Savoury cooking recipes
├── baking.html         # Baking & desserts
├── auth.html           # Login & Register
├── favorites.html      # User's saved recipes
│
├── css/
│   └── style.css       # All styles (CSS custom properties, responsive)
│
├── js/
│   ├── main.js         # Navbar, modal, toast, auth helpers, card renderer
│   ├── auth.js         # Register/login forms & validation
│   └── recipes.js      # Page-specific recipe rendering & favorites
│
├── data/
│   └── recipes.js      # Recipe data array (20 recipes total)
│
├── images/             # Local images (project uses Unsplash URLs)
│
└── README.md
```

---

## 🛠 Technologies Used

| Technology | Usage |
|---|---|
| **HTML5** | Semantic page structure, accessibility attributes |
| **CSS3** | Custom properties, Flexbox, Grid, animations, media queries |
| **Vanilla JavaScript** | DOM manipulation, event handling, dynamic rendering |
| **localStorage** | User accounts, sessions, per-user favorites |
| **JSON / JS Array** | Recipe data (`data/recipes.js`) |
| **Google Fonts** | Poppins (body) + Playfair Display (headings) |
| **Unsplash** | Free high-quality food photography |

---

## 🚀 How to Run

1. Clone or download the project folder.
2. Open `index.html` in any modern browser — no server required.
3. Register a free account to unlock Cooking, Baking, and Favorites pages.

> **Note:** Because the site uses `localStorage`, all data is stored locally in your browser. No data is sent to any server.

---

## 📸 Pages at a Glance

| Page | File | Auth Required |
|---|---|---|
| Home / Cover | `index.html` | ❌ |
| Cooking Recipes | `cooking.html` | ✅ |
| Baking Recipes | `baking.html` | ✅ |
| Login / Register | `auth.html` | ❌ |
| My Favorites | `favorites.html` | ✅ |

---

*Sweet & Savory Kitchen — where every dish tells a delicious story. 🌸*
