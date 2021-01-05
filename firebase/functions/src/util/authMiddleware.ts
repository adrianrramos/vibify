import { Request, Response, NextFunction } from "express";
import { admin, db } from "./admin";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let idToken;
		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
			idToken = req.headers.authorization.split("Bearer ")[1];
		} else {
			console.error("No token found");
			return res.status(403).json({ error: "Unauthorized" });
		}

		const decodedToken = await admin.auth().verifyIdToken(idToken);

		res.locals.user = decodedToken;

		const doc = await db.collection("users").doc(`${res.locals.user.uid}`).get();

		if (doc.exists) {
			res.locals.userHandle = doc.data()?.handle;
			return next();
		} else {
			return res.status(404).json({ message: "User not found some how?" });
		}
	} catch (err) {
		console.error("Error while verifying token ", err);
		return res.status(403).json(err);
	}
};
