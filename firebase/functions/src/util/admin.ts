import admin, { ServiceAccount } from "firebase-admin";
import FirebaseServiceAccount from "./vibe-maker-a6ee0-firebase-adminsdk-wkxj5-1e2ff64fac.json";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = FirebaseServiceAccount as ServiceAccount;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: `${process.env.FIREBASE_URL}`,
});

const db = admin.firestore();

const bucket = admin.storage().bucket(`${process.env.FIREBASE_BUCKET}`);

export { admin, db, bucket };
