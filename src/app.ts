import express, { Application, Request, Response } from "express";
const cors = require( "cors");

const app:Application = express();

app.use(cors());
app.use(express.json());

app.get("/v1/api/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hello World!",
    });
});

app.use('/v1/api/', require('./routes/index'))

try {
    app.listen(4000, (): void => {
        console.log(`Connected successfully on port ${4000}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}