import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//To setup environment variable
import "dotenv/config";


const app = express();
const port = 4000;

app.use(cors({
    origin: '*'
}))

const username=process.env.MONGO_USERNAME
const password=process.env.MONGO_PASSWORD

mongoose.connect("mongodb+srv://"+username+":"+password+"@cluster0.rz07emt.mongodb.net/booksApiData?retryWrites=true&w=majority&appName=Cluster").then(() => {

    app.listen(port, () => {
        console.log("Server Started On Port Number: ", port);
    });

})

const booksApiSchema = new mongoose.Schema(
    {
        author: {
            type: String,
        },
        title: {
            type: String,
        },
        subtitle: {
            type: String,
        },
        image: {
            type: String,
        },
    }
)

const booksApiModel = mongoose.model("books",booksApiSchema)

app.use(express.json());
app.post("/upload", (req, res) => {
    const dataToSave=booksApiModel(req.body)

    console.log(dataToSave)

    dataToSave.save().then(()=>{
        res.json("Data Uploaded Successfully...");
    })

})

app.get("/",async (req,res)=>{
    const dataToSend= await booksApiModel.find();
    res.json(dataToSend);
})
