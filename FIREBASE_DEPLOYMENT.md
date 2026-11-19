# Firebase deployment secrets (GitHub Actions)

The repository includes an automated Firebase Hosting deployment workflow. Before it can deploy, configure these three **GitHub Actions repository secrets** in Settings → Secrets and variables → Actions:

- `FIREBASE_SERVICE_ACCOUNT`: the JSON contents of a Firebase/GCP service-account key with permission to deploy Firebase Hosting to project `student-movement-tracker`. Never commit this JSON into the repository or paste it into chat.
- `FIREBASE_DRIVER_SITE_ID`: the Hosting site ID for the driver portal.
- `FIREBASE_MONITOR_SITE_ID`: the Hosting site ID for the administrator portal.

Create or confirm the two Hosting sites in Firebase Console → Hosting. The site IDs are distinct from the Firebase project ID. After adding these secrets, run the **Deploy Firebase Hosting** workflow from the GitHub Actions tab, or push a commit to `main`.

The workflow applies the Hosting targets and deploys the `driver` and `monitor` folders separately. It does not change Firestore data or publish Firestore Rules. Review and publish `firestore.rules` separately after testing.

For service-account security, use a dedicated least-privilege deploy identity, rotate its key if exposed, and remove the key from GitHub secrets when no longer needed. Prefer Workload Identity Federation over long-lived JSON keys if you configure it.
