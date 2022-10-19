import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth";
import { Request, Response } from "express";

export const validateToken = async (idToken: string) => {
  // idToken comes from the client app
  return await admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken: DecodedIdToken) => {
      return decodedToken.uid;
    });
};

export const middleware = async (req: Request, res: Response, next: any) => {
  try {
    // fetch auth header from client
    const header = req.headers.authorization;

    // Header not found
    if (!header) {
      res.status(403).send({ status: 403, message: "auth header is missing" });
      return;
    }

    // verify  auth token
    const token = header.split("Bearer ")[1];
    if (!token) {
      res.status(403).send({ status: 403, message: "auth token is missing" });
      return;
    }

    // validate the token recieved
    const userId = await validateToken(token);
    if (!userId) {
      res.status(403).send({ status: 403, message: "auth header is missing" });
      return;
    }

    res.locals.uid = userId;
    next();
  } catch (err: any) {
    res.status(500).send({
      success: false,
      code: err.code,
      message: err.message,
    });
  }
};
