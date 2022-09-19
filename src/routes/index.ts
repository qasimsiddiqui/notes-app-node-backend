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
router.get("/notes", async (req, res) => {
  try {
    const querySnapshot = await db.collection("notes").get();
    const notes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    res.status(200).send({
      notes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

/**
 * GET route
 * "/v1/api/note/:id"
 * Get single notes
 */
router.get("/note/:id", async (req, res) => {
  await db
    .collection("notes")
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).send({ error: "No note with this id" });
        return;
      }
      res.status(200).send({ note: doc.data() });
    })
    .catch((err) => {
      console.error("Error fetching document: ", err);
      res.status(500).send({
        error: err.error,
        message: err.message,
      });
    });
});

/**
 * PUT route
 * "/v1/api/note"
 * Add a note
 */
router.put("/note", async (req, res) => {
  const { body, author }: any = req.body;
  const documentReference = await db.collection("notes").doc();
  await documentReference
    .set({
      id: documentReference.id,
      body,
      author,
      time_created: Timestamp.now(),
      time_updated: Timestamp.now(),
      shared_to: [],
    })
    .then(() => {
      res.status(201).send({ message: "New Note added" });
    })
    .catch((err) => {
      console.error("Error fetching document: ", err);
      res.status(500).send({
        error: err.error,
        message: err.message,
      });
    });
});

/**
 * PATCH route
 * "/v1/api/note/:id"
 * Update a note
 */
router.patch("/note/:id", async (req, res) => {
  const { body } = req.body;
  await db
    .collection("notes")
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).send({ error: "No note with this id" });
      }
      doc.ref
        .update({
          body: body,
        })
        .then(() => {
          res.status(200).send({
            message: "Data updated",
          });
        });
    })
    .catch((err) => {
      console.error("Error fetching document: ", err);
      res.status(500).send({ error: "Error fetching data" });
    });
});

/**
 * DELETE route
 * "/v1/api/note/:id"
 * Delete a note
 */
router.delete("/note/:id", async (req, res) => {
  await db
    .collection("notes")
    .doc(req.params.id)
    .delete()
    .then(() => {
      res.status(200).send({ message: "Note successfully deleted" });
    })
    .catch((err) => {
      console.error("Error fetching document: ", err);
      res.status(500).send({ error: "Error fetching data" });
    });
});

module.exports = router;
