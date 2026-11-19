# Firebase deployment

The GitHub Actions workflow deploys two separate Firebase Hosting sites from the `driver/` and `monitor/` folders.

## Required GitHub Actions secret

In GitHub → Settings → Secrets and variables → Actions, create or update this repository secret:

- `FIREBASE_SERVICE_ACCOUNT`: the complete JSON contents of a dedicated Google service-account key for project `student-movement-tracker`.

The key must belong to the correct project and have permission to deploy Firebase Hosting. Do not commit the JSON key or paste it into chat. If a key was exposed, revoke/delete that specific key in Google Cloud IAM and create a replacement before using it again. Deleting a downloaded JSON file alone does not revoke the key.

## Hosting sites and targets

Create these two Hosting sites once in Firebase Console → Hosting (or Cloud Shell):

- Driver site ID: `student-movement-driver`
- Administrator site ID: `student-movement-admin`

The workflow deliberately does not try to create Hosting sites. This avoids requiring the deployment service account to have site-creation permissions. It maps the existing site IDs to the repository's `driver` and `monitor` targets, then deploys both folders.

If your actual site IDs are different, update the two IDs in `.github/workflows/firebase-deploy.yml` to match the IDs shown in Firebase Console.

## Deploy

After saving the secret and confirming both sites exist, open the repository's Actions tab and run **Deploy Firebase Hosting**, or push a commit to `main`.

## Firestore and Authentication setup

1. Enable Email/Password in Firebase Authentication.
2. Create a Firebase Authentication account for each driver and administrator.
3. In Firestore, create `users/{AUTH_UID}` documents. Set `role` to `driver` or `admin` as appropriate. Create the first administrator's document manually in the Firebase Console.
4. Keep the student register collection named exactly `Students` (capital S).
5. Review and publish `firestore.rules` in Firestore → Rules.

The portals use `Students`, `users`, `attendance`, `pickup_records`, and `movement_history`. A successful Hosting deployment does not automatically create accounts, assign roles, or publish Firestore Rules.

## GPS limitations

Driver GPS requires HTTPS, browser location permission, and the driver portal to remain open. It records location updates while tracking is active; it is not background tracking after the browser is closed.
