import db from "../firebase";
import { Router } from "express";
import { firestore } from "firebase-admin";
import Timestamp = firestore.Timestamp;

const router = Router();

/**
 * GET route
 * "/v1/api/notes"
 * Get all notes
 */
router.get("/users", async (req, res) => {
  try {
    const querySnapshot = await db.collection("users").get();
    const users = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    res.status(200).send({
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

/**
 * PUT route
 * "/v1/api/user/register"
 * Add user data to firestore
 */
router.put("/user/register", async (req, res) => {
  const { id, name, username, email }: any = req.body;
  try {
    await db
      .collection("users")
      .doc(`${id}`)
      .set({
        id,
        name,
        username,
        email,
        time_created: Timestamp.now(),
        time_updated: Timestamp.now(),
      })
      .then(() => {
        res.status(200).send({
          status: "success",
          message: "User data added to firestore",
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching data" });
  }
});

/**
 * GET route
 * "/v1/api/user/:id"
 * Get user data
 */
router.get("/user/:id", async (req, res) => {
  await db
    .collection("users")
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).send({ error: "No user with this id" });
        return;
      }
      res.status(200).send({ user: doc.data() });
    })
    .catch((err) => {
      console.error("Error fetching document: ", err);
      res.status(500).send({ error: "Error fetching data" });
    });
});

/**
 * PATCH route
 * "/v1/api/user/:id"
 * Update user data
 */
router.patch("/user/:id", async (req, res) => {
  await db
    .collection("users")
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).send({ error: "No user with this id" });
      }
      doc.ref.update({
        ...req.body,
        time_updated: Timestamp.now(),
      });
      res.status(200).send({
        message: "Data updated",
      });
    })
    .catch((err) => {
      console.error("Error fetching document: ", err);
      res.status(500).send({ error: "Server error" });
    });
});

/**
 * DELETE route
 * "/v1/api/user/:id"
 * Delete user
 */
router.delete("/user/:id", async (req, res) => {
  await db
    .collection("users")
    .doc(req.params.id)
    .delete()
    .then(() => {
      res.status(200).send({ message: "User successfully deleted" });
    })
    .catch((err) => {
      console.error("Error fetching document: ", err);
      res.status(500).send({ error: "Error fetching data" });
    });
});

module.exports = router;
