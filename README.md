# Student Movement Tracker

Two separate web interfaces share the Firebase project `student-movement-tracker`.

- `index.html`: driver attendance app (picked up / absent) and opt-in vehicle GPS.
- `monitor.html`: administrator dashboard, attendance history, movement events, map links and CSV export.
- `firebase.js`: Firebase web configuration.
- `firestore.rules`: suggested Firestore security rules.

## Required Firebase setup

1. In Firebase Console, open **Authentication → Sign-in method** and enable **Email/Password**.
2. Create accounts for each driver and one administrator.
3. In **Firestore Database**, create a collection named `users`. For the administrator, create a document whose document ID is the administrator's Firebase Authentication UID, with field `role` (string) = `admin`. Driver accounts do not need a role document.
4. Create a `students` collection. Each student document should have:
   - `name` (string)
   - `active` (boolean, true)
   - Optional: `className`, `route`, `parentContact` (strings)
5. Open **Firestore → Rules**, review and publish the contents of `firestore.rules`. Do not use public read/write rules.
6. If hosting on GitHub Pages, enable Pages for the repository's `main` branch and add the published hostname to Firebase Authentication → Settings → Authorized domains.

## Data collections

- `attendance`: append-only attendance events with student, status, date, driver and timestamp.
- `movements`: pickup/absence events and vehicle GPS coordinates.
- `students`: student register.
- `users`: administrator role profile.

## Important

GPS tracking starts only after a signed-in driver presses **Start GPS** and grants location permission. Browsers generally require HTTPS for geolocation, so use GitHub Pages or another HTTPS host. The dashboard requires an administrator account with the Firestore `users/{uid}` document described above.

The app has not been deployed or live-tested against your Firebase database yet. Add student records and complete the Firebase setup before operational use.