# Frontend Source Structure

## Quick Navigation

```
src/
├── 📱 App.jsx              - Main app with routing
├── 🎨 App.css              - Global styles
├── 🔧 contexts/            - React contexts (Auth, Theme)
├── 🛠️  utils/               - Helpers & constants
├── 🧩 components/          - Reusable components
│   ├── layout/            - Layout components
│   ├── cards/             - Card components (TODO)
│   └── modals/            - Modal dialogs (TODO)
└── 📄 pages/               - Page components
```

## Import Patterns

### Using Barrel Exports
```jsx
// ✅ Clean imports via index files
import { useAuth, useTheme } from './contexts';
import { MainLayout } from './components/layout';
import { API, getCollegeName } from './utils';
import { LandingPage, AuthPage } from './pages';

// ❌ Avoid direct imports (unless necessary)
import { useAuth } from './contexts/AuthContext';
```

## Key Files

### Contexts
- **AuthContext.jsx**: User auth state, login/logout, `ProtectedRoute` component
- **ThemeContext.jsx**: Light/dark theme switching

### Utils
- **constants.js**: `BACKEND_URL`, `API` endpoint
- **helpers.js**: `getCollegeName(email)` parser

### Components
- **MainLayout.jsx**: App sidebar, navigation, user profile
- **ThemeToggle.jsx**: Theme toggle button

### Pages
- **LandingPage.jsx**: Public homepage
- **AuthPage.jsx**: Login/register form
- **Others**: Currently in App.legacy.jsx (see MIGRATION_GUIDE.md)

## Adding New Features

### 1. New Page
```jsx
// src/pages/MyNewPage.jsx
import { useAuth } from '../contexts';
import { API } from '../utils';

export function MyNewPage() {
  const { user } = useAuth();
  // Your component code
}
```

```jsx
// src/pages/index.js
export { MyNewPage } from './MyNewPage';
```

```jsx
// src/App.jsx
import { MyNewPage } from './pages';
// Add route...
```

### 2. New Component
```jsx
// src/components/cards/MyCard.jsx
export function MyCard({ data }) {
  return <div className="card">{data.title}</div>;
}
```

### 3. New Utility
```jsx
// src/utils/helpers.js
export const myHelper = (input) => {
  // Helper logic
};
```

## State Management

- **Auth State**: `useAuth()` hook from `AuthContext`
- **Theme State**: `useTheme()` hook from `ThemeContext`
- **Local State**: `useState` in components
- **Server State**: Axios calls to `API` endpoint

## Styling

- Global styles in `App.css`
- CSS variables for theming (light/dark)
- Component-specific styles via classNames
- Inline styles for dynamic values

## Next Steps

See `../MIGRATION_GUIDE.md` for completing the restructuring.
