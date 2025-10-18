# 🚀 Quick Reference Guide

## 📁 Where to Find Things

```
src/
├── App.jsx              → Main routing
├── contexts/            → Auth, Theme state
├── utils/               → Helpers, API config
├── components/layout/   → MainLayout, ThemeToggle
├── pages/               → Page components
└── App.legacy.jsx       → Legacy components (still working)
```

---

## 🔥 Common Tasks

### Add a New Page

```jsx
// 1. Create the page
// src/pages/MyPage.jsx
import { useAuth } from '../contexts';

export function MyPage() {
  const { user } = useAuth();
  return <div>My Page</div>;
}

// 2. Export it
// src/pages/index.js
export { MyPage } from './MyPage';

// 3. Add route
// src/App.jsx
import { MyPage } from './pages';

<Route path="/mypage" element={
  <ProtectedRoute>
    <MainLayout>
      <MyPage />
    </MainLayout>
  </ProtectedRoute>
} />
```

### Use Auth

```jsx
import { useAuth } from './contexts';

function MyComponent() {
  const { user, token, login, logout } = useAuth();
  
  return <div>Welcome {user?.full_name}</div>;
}
```

### Use Theme

```jsx
import { useTheme } from './contexts';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

### Make API Call

```jsx
import { API } from './utils';
import axios from 'axios';
import { useAuth } from './contexts';

function MyComponent() {
  const { token } = useAuth();
  
  const fetchData = async () => {
    const response = await axios.get(`${API}/endpoint`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  };
}
```

### Use College Filter

```jsx
import { getCollegeName } from './utils';
import { useAuth } from './contexts';

function MyComponent() {
  const { user } = useAuth();
  const userCollege = getCollegeName(user?.email);
  
  // Filter data by college
  const filteredItems = items.filter(item => {
    const itemCollege = getCollegeName(item.email);
    return itemCollege?.toLowerCase() === userCollege?.toLowerCase();
  });
}
```

---

## 📦 Import Cheatsheet

```jsx
// Contexts
import { useAuth } from './contexts';
import { useTheme } from './contexts';
import { ProtectedRoute } from './contexts';

// Layout
import { MainLayout } from './components/layout';
import { ThemeToggle } from './components/layout';

// Utils
import { API, BACKEND_URL } from './utils';
import { getCollegeName } from './utils';

// Pages
import { LandingPage, AuthPage, FeedPage } from './pages';
```

---

## 🎨 Styling

```jsx
// Use CSS classes
<div className="page-container">

// Use CSS variables
<div style={{ color: 'var(--text-primary)' }}>

// Theme-aware colors
var(--text-primary)    // Main text
var(--text-secondary)  // Muted text
var(--bg-primary)      // Main background
var(--accent-primary)  // Accent color
```

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests (if configured)
npm test
```

---

## 📂 File Naming Conventions

- **Components**: `PascalCase.jsx` (e.g., `UserProfile.jsx`)
- **Pages**: `PascalCase.jsx` + "Page" suffix (e.g., `DashboardPage.jsx`)
- **Utils**: `camelCase.js` (e.g., `helpers.js`)
- **Contexts**: `PascalCase.jsx` + "Context" suffix (e.g., `AuthContext.jsx`)
- **Hooks**: `use` + `PascalCase.js` (e.g., `useAuth.js`)

---

## 🔍 Find Code Quickly

| Looking for... | Check here... |
|----------------|---------------|
| Authentication | `contexts/AuthContext.jsx` |
| Theme switching | `contexts/ThemeContext.jsx` |
| API endpoint | `utils/constants.js` |
| Helper functions | `utils/helpers.js` |
| Main layout | `components/layout/MainLayout.jsx` |
| Routing | `App.jsx` |
| Landing page | `pages/LandingPage.jsx` |
| Login/register | `pages/AuthPage.jsx` |
| Other pages | `App.legacy.jsx` (for now) |

---

## 🐛 Common Issues

### Import not found
```jsx
// ❌ Wrong
import { useAuth } from './contexts/AuthContext';

// ✅ Correct
import { useAuth } from './contexts';
```

### Protected route not working
```jsx
// ✅ Wrap with ProtectedRoute + MainLayout
<Route path="/dashboard" element={
  <ProtectedRoute>
    <MainLayout>
      <DashboardPage />
    </MainLayout>
  </ProtectedRoute>
} />
```

### Theme not applying
```jsx
// Check that App is wrapped with ThemeProvider
<ThemeProvider>
  <App />
</ThemeProvider>
```

---

## 📖 Documentation

- **REFACTORING_SUMMARY.md** - What changed & why
- **STRUCTURE.md** - Visual folder structure
- **MIGRATION_GUIDE.md** - How to extract from legacy
- **src/README.md** - Source code navigation

---

## 🎯 Quick Wins

### Add a new nav item
```jsx
// src/components/layout/MainLayout.jsx
const allNavItems = [
  // ... existing items
  { path: '/mynew', label: 'My New', icon: '🆕', roles: ['student'] }
];
```

### Create a new modal
```jsx
// src/components/modals/MyModal.jsx
export function MyModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal content */}
      </div>
    </div>
  );
}
```

### Add a new card
```jsx
// src/components/cards/MyCard.jsx
export function MyCard({ data }) {
  return (
    <div className="card">
      <h3 className="card-title">{data.title}</h3>
      <p className="card-description">{data.description}</p>
    </div>
  );
}
```

---

## 💡 Pro Tips

1. **Use barrel exports**: Import from `index.js` files for cleaner code
2. **Keep components small**: One component = one file
3. **Use existing utilities**: Check `utils/` before creating new helpers
4. **Follow the pattern**: Look at existing pages/components as templates
5. **Test as you go**: Run `npm run dev` to verify changes

---

## 🚀 Ready to Code!

You now have:
- ✅ Clean architecture
- ✅ All features working
- ✅ Easy navigation
- ✅ Great DX (Developer Experience)

**Happy coding! 🎉**
