# FoodBridge Frontend – Updated UI

This frontend is a visual and UX upgrade of the original FoodBridge React application. It keeps the existing backend contract and uses the implemented endpoints rather than introducing mock API calls.

## Backend endpoints used by this frontend

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/donations`
- `POST /api/donations`
- `POST /api/donations/:id/claim`
- `GET /api/admin/dashboard`

The donor dashboard derives cards and charts from the live `/api/donations` response. The NGO dashboard claims through the real donation claim endpoint. The admin dashboard uses the live admin dashboard endpoint.

## Local development

From the monorepo root:

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:4000`

Optional frontend API override:

```env
VITE_API_URL=http://localhost:4000/api
```

## UI highlights

- Responsive sidebar navigation
- Donor welcome banner with food-themed illustration
- Live donation statistic cards
- Recharts impact donut and donation activity chart
- Recent donation table with status badges
- NGO donation discovery and claim cards
- Volunteer workspace
- Admin live metric dashboard
- Notification/profile popovers
- Mobile navigation
- Improved donation form with local date/time handling and minimum consume-by validation
- Protected role-specific routes
- No hard-coded production impact statistics

## Important backend limitation

The current backend does not yet expose organization creation/verification APIs for the NGO workflow. Therefore an NGO can log in and view available donations, but claiming requires an Organization document with `verificationStatus: VERIFIED` in MongoDB. The frontend does not fake that verification state.
