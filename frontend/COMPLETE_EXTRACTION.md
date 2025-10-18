# Complete Extraction Plan - Eliminating App.legacy.jsx

## Status: IN PROGRESS

### Pages Extracted ✅
1. ✅ FeedPage → `src/pages/FeedPage.jsx`
2. ✅ EventsPage → `src/pages/EventsPage.jsx`
3. ⏳ ClubsPage → `src/pages/ClubsPage.jsx` (IN PROGRESS)
4. ⏳ ResourcesPage → `src/pages/ResourcesPage.jsx`
5. ⏳ OpportunitiesPage → `src/pages/OpportunitiesPage.jsx`
6. ⏳ MarketplacePage → `src/pages/MarketplacePage.jsx`
7. ⏳ LostFoundPage → `src/pages/LostFoundPage.jsx`

### Modals to Extract ⏳
1. EventDetailModal
2. CreateEventModal
3. ClubDetailModal
4. CreateClubModal
5. ClubApplicationsModal
6. ShareResourceModal
7. OpportunityDetailModal
8. ShareItemModal
9. MarketplaceDetailModal
10. ReportLostFoundModal
11. LostFoundDetailModal

## Extraction Details

Each page component is being extracted with:
- Proper imports from contexts, utils, and card components
- All useState, useEffect hooks
- Event handlers and API calls
- Modal integration

All modals will be extracted to `src/components/modals/` with barrel exports.

## Final Steps
1. Extract all remaining pages
2. Extract all modals
3. Create `src/components/modals/index.js`
4. Update `src/pages/index.js`
5. Test build
6. Delete App.legacy.jsx

## Expected Result
- Modern, organized structure
- No legacy file
- Clear separation of concerns
- Easy to maintain
