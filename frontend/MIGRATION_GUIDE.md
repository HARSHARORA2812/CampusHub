# Frontend Restructuring Migration Guide

## Overview
The frontend has been restructured from a single monolithic `App.jsx` (3187 lines) into a modern, maintainable architecture.

## New Structure

```
src/
├── App.jsx                    # Clean routing (100 lines)
├── App.legacy.jsx             # Legacy monolithic file (temporary)
├── App.css                    # Global styles
│
├── contexts/                  # React Context providers
│   ├── index.js              # Barrel export
│   ├── AuthContext.jsx       # Authentication state & ProtectedRoute
│   └── ThemeContext.jsx      # Theme management (light/dark)
│
├── utils/                     # Utility functions & constants
│   ├── index.js              # Barrel export
│   ├── constants.js          # API URLs, axios config
│   └── helpers.js            # Helper functions (e.g., getCollegeName)
│
├── components/
│   ├── layout/               # Layout components
│   │   ├── index.js          # Barrel export
│   │   ├── MainLayout.jsx    # Main app layout with sidebar
│   │   └── ThemeToggle.jsx   # Theme toggle component
│   │
│   ├── cards/                # Card components (TO DO)
│   │   ├── EventCard.jsx
│   │   ├── ClubCard.jsx
│   │   ├── OpportunityCard.jsx
│   │   ├── MarketplaceCard.jsx
│   │   └── PostCard.jsx
│   │
│   └── modals/               # Modal components (TO DO)
│       ├── EventDetailModal.jsx
│       ├── CreateEventModal.jsx
│       ├── ClubDetailModal.jsx
│       └── ...
│
└── pages/                     # Page components
    ├── index.js              # Barrel export
    ├── LandingPage.jsx       # ✅ Migrated
    ├── AuthPage.jsx          # ✅ Migrated
    ├── FeedPage.jsx          # ⏳ TODO (currently from legacy)
    ├── EventsPage.jsx        # ⏳ TODO (currently from legacy)
    ├── ClubsPage.jsx         # ⏳ TODO (currently from legacy)
    ├── ResourcesPage.jsx     # ⏳ TODO (currently from legacy)
    ├── OpportunitiesPage.jsx # ⏳ TODO (currently from legacy)
    ├── MarketplacePage.jsx   # ⏳ TODO (currently from legacy)
    └── LostFoundPage.jsx     # ⏳ TODO (currently from legacy)
```

## Completed Migrations ✅

### 1. Context Providers
- **AuthContext.jsx**: User authentication, login/logout, protected routes
- **ThemeContext.jsx**: Theme switching (light/dark mode)

### 2. Utilities
- **constants.js**: Backend URL, API endpoint configuration
- **helpers.js**: `getCollegeName()` email parser

### 3. Layout Components
- **MainLayout.jsx**: Sidebar navigation, user info display
- **ThemeToggle.jsx**: Theme toggle button

### 4. Pages
- **LandingPage.jsx**: Public landing page
- **AuthPage.jsx**: Login/Register page

### 5. App Structure
- **App.jsx**: Clean routing with barrel imports
- All imports use clean paths via index files

## TODO: Complete Migration 📋

### Step 1: Extract Card Components
Extract from `App.legacy.jsx` to `components/cards/`:
- `EventCard` (line ~634)
- `OpportunityCard` (line ~2233)
- `MarketplaceCard` (line ~2655)
- `PostCard` (line ~3153)

### Step 2: Extract Modal Components
Extract from `App.legacy.jsx` to `components/modals/`:
- `EventDetailModal` (line ~675)
- `CreateEventModal` (line ~793)
- `ClubDetailModal` (line ~1225)
- `CreateClubModal` (line ~1342)
- `ClubApplicationsModal` (line ~1542)
- `ShareResourceModal` (line ~1889)
- `OpportunityDetailModal` (line ~2125)
- `ShareItemModal` (line ~2359)
- `MarketplaceDetailModal` (line ~2551)
- `ReportLostFoundModal` (line ~2835)
- `LostFoundDetailModal` (line ~3042)

### Step 3: Extract Page Components
Extract from `App.legacy.jsx` to `pages/`:
- `FeedPage` (line ~441)
- `EventsPage` (line ~555)
- `ClubsPage` (line ~1005)
- `ResourcesPage` (line ~1747)
- `OpportunitiesPage` (line ~2073)
- `MarketplacePage` (line ~2273)
- `LostFoundPage` (line ~2707)

### Step 4: Clean Up
- Remove `App.legacy.jsx`
- Update all imports to use new structure
- Create barrel exports for cards and modals

## Benefits of New Structure 🎯

1. **Maintainability**: Each file has a single responsibility
2. **Discoverability**: Clear folder structure makes finding code easy
3. **Reusability**: Components can be easily imported anywhere
4. **Testing**: Easier to write unit tests for isolated components
5. **Code Splitting**: Better bundle optimization potential
6. **Team Collaboration**: Reduces merge conflicts
7. **Type Safety**: Easier to add TypeScript later

## Import Pattern Examples

### Before (Monolithic)
```jsx
// Everything in one 3187-line file
// Hard to find, hard to maintain
```

### After (Structured)
```jsx
// Clean, organized imports
import { useAuth } from '@/contexts';
import { MainLayout } from '@/components/layout';
import { EventCard } from '@/components/cards';
import { CreateEventModal } from '@/components/modals';
import { getCollegeName } from '@/utils';
```

## Migration Tips

1. **Extract dependencies**: When extracting a component, identify all imports it needs
2. **Update imports**: Use relative paths or create barrel exports
3. **Test after each extraction**: Ensure the app still works
4. **Maintain data flow**: Keep props and state management intact
5. **Use find & replace**: For updating import paths across files

## Current Status

- ✅ **Foundation**: Contexts, utils, layout complete
- ✅ **Routing**: Modern App.jsx with clean imports  
- ⏳ **Components**: Cards and modals need extraction
- ⏳ **Pages**: Feature pages need extraction
- 🎯 **Goal**: Remove App.legacy.jsx entirely

The app is fully functional in its current state. The legacy file can be gradually migrated without breaking changes.
