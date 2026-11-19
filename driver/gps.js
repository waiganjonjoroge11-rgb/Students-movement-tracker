import { getApps, initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../firebase-config.js";

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const start = document.getElementById("gpsStart");
const stop = document.getElementById("gpsStop");
const status = document.getElementById("gpsStatus");
let watchId = null;
let currentUser = null;
let saving = false;

onAuthStateChanged(auth, user => {
  currentUser = user;
  if (!user) stopTracking();
});

function stopTracking() {
  if (watchId !== null && navigator.geolocation) navigator.geolocation.clearWatch(watchId);
  watchId = null;
  if (start) start.disabled = !currentUser;
  if (stop) stop.disabled = true;
  if (status) status.textContent = "GPS tracking is stopped.";
}

start?.addEventListener("click", () => {
  if (!currentUser) { status.textContent = "Sign in before starting GPS."; return; }
  if (!("geolocation" in navigator)) { status.textContent = "This browser does not support GPS location."; return; }
  if (!window.isSecureContext) { status.textContent = "GPS requires a secure HTTPS website."; return; }
  if (watchId !== null) return;
  status.textContent = "Waiting for GPS permission and location…";
  watchId = navigator.geolocation.watchPosition(async position => {
    if (!currentUser || saving) return;
    saving = true;
    const c = position.coords;
    try {
      await addDoc(collection(db, "movement_history"), {
        type: "vehicle-location",
        driverUid: currentUser.uid,
        driverEmail: currentUser.email || "",
        vehicle: document.getElementById("vehicle")?.value.trim() || "",
        route: document.getElementById("route")?.value.trim() || "",
        latitude: c.latitude,
        longitude: c.longitude,
        accuracy: c.accuracy,
        createdAt: serverTimestamp()
      });
      status.textContent = "GPS location saved. Accuracy: " + Math.round(c.accuracy) + " metres. Last update: " + new Date().toLocaleTimeString();
      start.disabled = true;
      stop.disabled = false;
    } catch (error) {
      status.textContent = "Could not save GPS location: " + error.message;
    } finally {
      saving = false;
    }
  }, error => {
    status.textContent = "GPS error: " + error.message;
    stopTracking();
  }, { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 });
  start.disabled = true;
  stop.disabled = false;
  status.textContent = "GPS tracking is active. Keep this page open.";
});
stop?.addEventListener("click", stopTracking);
