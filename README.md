# Student Movement Tracker

Two separate Firebase-backed web apps using the existing Firebase project **student-movement-tracker**.

## Applications
- **Driver application:** `driver/index.html` — driver sign-in, attendance check-in/check-out, student pickup ✓ and absence ✗, and automatic time-stamped movement history.
- **Remote administrator website:** `monitor/index.html` — separate administrator sign-in, dashboard counts, student pickup register, driver attendance, movement history, and CSV report downloads.

## Firebase setup
The existing Firebase Web App configuration is connected in `firebase-config.js`. Do not add service-account private keys to this public repository.

1. In Firebase Console, open Authentication → Sign-in method and enable **Email/Password**.
2. Create one account for each driver and at least one administrator.
3. In Firestore, create a `users` document for each account. The document ID must be that account's Firebase Authentication UID. Set `role` to `driver` for drivers or `admin` for administrators.
4. Keep the existing student register in the capitalized `Students` collection. Each document should have a `name`, `fullName`, or `studentName` field (the document ID is used if no name exists). A `phone` field is optional.
5. Review and publish `firestore.rules` in Firestore → Rules. These rules require authenticated users and role documents; administrators can read reports, while drivers can write and read their own records.
6. Enable the Firebase Hosting product before deployment.

## Hosting as two separate websites
The repository includes `firebase.json` with two Hosting targets. From a computer with the Firebase CLI installed, run:

```sh
npm install -g firebase-tools
firebase login
firebase use student-movement-tracker
firebase target:apply hosting driver student-movement-tracker
firebase target:apply hosting monitor student-movement-tracker
firebase deploy --only hosting:driver,hosting:monitor
```

This creates two separate Hosting sites in the same Firebase project. The final URLs are shown by the Firebase CLI after deployment.

## Firestore collections used
- `Students` — existing student register.
- `users` — account role documents.
- `attendance` — driver check-in/check-out records.
- `pickup_records` — picked/absent records.
- `movement_history` — automatic event history.

## Current status and limitations
The application files and Firebase configuration are committed to GitHub. They have not yet been deployed to Firebase Hosting or tested against live Firestore. The Firebase Authentication accounts, role documents, and security rules still need to be completed in the Firebase Console. CSV downloads contain the most recent records loaded by the dashboard (up to 300 per category and 500 movement events per refresh).
