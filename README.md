# Student Movement Tracker

Two separate web applications share the existing Firebase project **student-movement-tracker**.

- **Driver portal:** `driver/index.html` — sign-in, driver check-in/check-out, student pickup register (✓ picked up / ✗ absent), timestamped movement history, and opt-in GPS tracking.
- **Administrator portal:** `monitor/index.html` — administrator-only dashboard, student register, attendance, pickup history, daily/monthly CSV reports, print/PDF, and movement history.
- **firebase.json:** two Hosting targets, `driver` and `monitor`.
- **firestore.rules:** role-based Firestore access rules.

## Setup before live use

1. Enable Email/Password under Firebase Authentication → Sign-in method.
2. Create each driver/admin account in Firebase Authentication.
3. Create `users/{AUTH_UID}` documents in Firestore, setting `role` to exactly `driver` or `admin`. Create the first admin document manually in the Firebase Console.
4. Keep the existing student collection named exactly `Students` (capital S). Student documents should include `name`; optional fields include `className`, `route`, and `parentContact`.
5. Review and publish `firestore.rules` in Firestore → Rules.
6. The GitHub Actions deployment workflow creates the two Hosting sites if they are missing: `student-movement-driver` and `student-movement-admin`.
7. Add both Hosting domains to Firebase Authentication → Settings → Authorized domains.

## Data collections

- `users`: account roles.
- `Students`: student register.
- `attendance`: driver check-in/check-out events.
- `pickup_records`: append-only student pickup/absence records.
- `movement_history`: driver, student, and GPS events.

## Deployment

Add a valid `FIREBASE_SERVICE_ACCOUNT` repository secret in GitHub → Settings → Secrets and variables → Actions. The service account must have Firebase Hosting deployment permission in project `student-movement-tracker`.

Run **Deploy Firebase Hosting** from the GitHub Actions tab, or push a commit to `main`. The workflow creates either Hosting site if missing, maps the sites to the `driver` and `monitor` targets, and deploys both portals. The service account needs permission to create Firebase Hosting sites as well as deploy Hosting releases.

If your Firebase Hosting site IDs differ, edit the IDs in `.github/workflows/firebase-deploy.yml` to match Firebase Console.

## GPS and privacy

GPS tracking requires HTTPS, browser location permission, and the driver page to remain open. Location points are saved only while the driver starts tracking. This is not background tracking after the browser is closed. Test with dummy student records before entering real children's personal information.
