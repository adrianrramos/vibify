import { Request, Response } from "express";
import { db } from "../util/admin";
import { _namespaceWithOptions } from "firebase-functions/lib/providers/firestore";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    // new user schema
    const newUser = {
      createdAt: new Date(),
      email: req.body.email,
      handle: req.body.handle,
      userId: req.body.userId,
    };

    await db.collection("users").doc(`${newUser.userId}`).set(newUser);

    const resUser = { ...newUser };
    return res.status(200).json(resUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    return "poo poo";
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};
