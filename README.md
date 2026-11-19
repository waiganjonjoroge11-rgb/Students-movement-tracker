# Student Movement Tracker

Two separate web applications share the existing Firebase project **student-movement-tracker**.

- **Driver app:** `driver/index.html` — driver sign-in, check-in/check-out, student pickup register (✓ picked / ✗ absent), timestamped movement history, and opt-in GPS tracking while the page remains open.
- **Remote monitor:** `monitor/index.html` — administrator-only dashboard, student register, driver attendance, pickup history, daily/monthly CSV exports, and movement history.
- `firebase-config.js` — shared Firebase Web App configuration.
- `firebase.json` — separate Firebase Hosting targets named `driver` and `monitor`.
- `firestore.rules` — access controls for administrators and drivers.

## Firebase setup required before use

1. In Firebase Console → Authentication → Sign-in method, enable **Email/Password**.
2. Create one Firebase Authentication account for each driver and one for the administrator.
3. In Firestore, create a `users` document for every account. Use the exact Firebase Authentication UID as the document ID:
   - Administrator: `role: "admin"`
   - Driver: `role: "driver"`
4. Keep your existing student collection named **Students** (capital S). Each student document should include a `name` field. The driver app reads from this existing collection.
5. Review and publish `firestore.rules` in Firestore → Rules. Do not replace them with public read/write rules.
6. Add the deployed hosting domains to Firebase Authentication → Settings → Authorized domains.
7. Driver GPS tracking requires HTTPS, browser location permission, and the driver page to remain open. It records periodic location points; it is not background tracking when the browser is closed.

## Firestore collections used

- `users`: role assignments for driver and administrator accounts.
- `Students`: existing student register.
- `attendance`: driver check-in/check-out records.
- `pickup_records`: append-only picked/absent student records.
- `movement_history`: timestamped driver and student movement events.

## Separate hosting sites

The Firebase Hosting configuration has two targets. From a local copy of this repository with Firebase CLI installed and the correct Firebase account selected, create the two hosting sites/targets if they do not already exist, then deploy:

```bash
firebase target:apply hosting driver YOUR_DRIVER_SITE_ID
firebase target:apply hosting monitor YOUR_MONITOR_SITE_ID
firebase deploy --only hosting:driver,hosting:monitor
```

The Firebase project ID and the two Hosting site IDs are not interchangeable. Create/confirm the Hosting sites in Firebase Console → Hosting before deploying.

## Operational notes

- Driver and administrator interfaces are separate websites but share the same Firestore database.
- Drivers must be assigned `role: "driver"`; otherwise Firestore correctly denies access.
- CSV export is available in the remote monitor for the records currently loaded.
- This repository update does not itself publish Firestore Rules or deploy Hosting. Complete the Firebase setup and hosting deployment steps above before live use.
