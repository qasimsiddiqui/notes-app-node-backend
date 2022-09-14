import db from '../firebase';
import {Router} from "express";
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

const router = Router();

/**
 * GET route
 * "/v1/api/notes"
 * Get all notes
 */
router.get("/notes", async (req, res)=>{
    try {
        const querySnapshot = await db.collection("notes").get();
        const notes = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
        res.send( { notes });
    } catch (error) {
        console.error(error);
    }
});

/**
 * GET route
 * "/v1/api/notes/:id"
 * Get single notes
 */
router.get("/note/:id", async (req, res)=>{

   await db.collection("notes").doc(req.params.id).get().then(
        doc=> {
            if(!doc.exists){
                res.send({'error':'No note with this id'});
                return;
            }
            res.send({"note":doc.data()})
        }
    ).catch(err => {
            console.error('Error fetching document: ', err);
            res.send({'error':'Error fetching data'});
            process.exit()
        }
    )
});


/**
 * PUT route
 * "/v1/api/notes"
 * Add a notes
 */
router.put("/note", async (req, res)=>{
    const {body} :any= req.body;
    const documentReference = await db.collection("notes").doc();
    await documentReference.set({
        id: documentReference.id,
        body: body,
        time: Timestamp.now()
    })
    res.send({"message":"New Note added"})
});

/**
 * PATCH route
 * "/v1/api/notes/:id"
 * Update a notes
 */
router.patch("/note/:id", async (req, res)=>{
    const {body} = req.body;
    await db.collection("notes").doc(req.params.id).get().then(
        doc=> {
            if(!doc.exists){
                res.send({'error':'No note with this id'});
            }
            doc.ref.update({
                body: body
            })
            res.send({
                "message": "Data updated"
            })
        }
    ).catch(err => {
            console.error('Error fetching document: ', err);
            res.send({'error':'Error fetching data'});
        }
    )
});

/**
 * DELETE route
 * "/v1/api/notes/:id"
 * Delete a notes
 */
router.delete("/note/:id", async (req, res)=>{
    await db.collection("notes").doc(req.params.id).delete().catch(err => {
            console.error('Error fetching document: ', err);
            res.send({'error':'Error fetching data'});
        }
    )
    res.send({"message": "Note successfully deleted"})
});


module.exports = router;