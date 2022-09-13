import db from '../firebase';
import {Router} from "express";
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

const router = Router();
/**
 * GET route
 * "/v1/api/todos"
 * Get all todos
 */
router.get("/todo", async (req, res)=>{
    try {
        const querySnapshot = await db.collection("todos").get();
        const todos = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
        res.send( { todos });
    } catch (error) {
        console.error(error);
    }
});

/**
 * GET route
 * "/v1/api/todos/:id"
 * Get single todos
 */
router.get("/todo/:id", async (req, res)=>{

   await db.collection("todos").doc(req.params.id).get().then(
        doc=> {
            if(!doc.exists){
                res.send({'error':'No todo with this id'});
            }
            res.send({"todo":doc.data()})
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
 * "/v1/api/todos"
 * Add a todos
 */
router.put("/todo", async (req, res)=>{
    const {body} :any= req.body;
    const documentReference = await db.collection("todos").doc();
    await documentReference.set({
        id: documentReference.id,
        body: body,
        time: Timestamp.now()
    })
    res.send("New Todo added")
});

/**
 * PATCH route
 * "/v1/api/todos/:id"
 * Update a todos
 */
router.patch("/todo/:id", async (req, res)=>{
    const {body} = req.body;
    await db.collection("todos").doc(req.params.id).get().then(
        doc=> {
            if(!doc.exists){
                res.send({'error':'No todo with this id'});
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
 * "/v1/api/todos/:id"
 * Delete a todos
 */
router.delete("/todo/:id", async (req, res)=>{
    await db.collection("todos").doc(req.params.id).delete().catch(err => {
            console.error('Error fetching document: ', err);
            res.send({'error':'Error fetching data'});
        }
    )
});


module.exports = router;