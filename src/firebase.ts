import admin from 'firebase-admin';

const serviceAccount = require('../fir-project-4a1fc-firebase-adminsdk-qm3ul-1195df2581.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

export default db;