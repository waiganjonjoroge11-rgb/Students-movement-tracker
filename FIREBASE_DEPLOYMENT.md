# Firebase deployment

The GitHub Actions workflow deploys two separate Firebase Hosting sites from the `driver/` and `monitor/` folders.

## Required GitHub Actions secret

Add one repository secret in GitHub → Settings → Secrets and variables → Actions:

- `FIREBASE_SERVICE_ACCOUNT`: the complete JSON contents of a dedicated Google/Firebase service-account key authorised to create Firebase Hosting sites and deploy Hosting to project `student-movement-tracker`.

Do not commit the JSON key or paste it into chat. Use a least-privilege deployment identity and rotate/revoke its key if it is exposed.

## Hosting sites

The workflow creates these sites if they do not already exist, then configures the Firebase Hosting targets automatically:

- Driver portal site ID: `student-movement-driver`
- Administrator portal site ID: `student-movement-admin`

No separate Hosting site ID secrets are required.

## Deploy

After saving the secret, open the repository's Actions tab and run **Deploy Firebase Hosting**, or push a commit to `main`.

## Firestore setup

The portals use Firebase Authentication and Cloud Firestore. Publish `firestore.rules` from Firebase Console → Firestore Database → Rules after reviewing them.

Create driver and administrator accounts in Firebase Authentication. Then create a Firestore document in `users/{AUTH_UID}` for each account, with a `role` field set to either `driver` or `admin`. Create the first administrator's user document using the Firebase Console, not the client app.

The student register collection name is case-sensitive: `Students`. Driver activity is stored in `attendance`, `pickup_records`, and `movement_history`.

## Important

A successful Hosting deployment does not by itself create user accounts, assign roles, enable Authentication providers, or publish Firestore Rules. Test those separately before using the portals with real student data.
