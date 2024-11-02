import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve index.html
app.get("/", (req, res) => {
    // res.status(201).send({msg:"hello " ,
    //     name:"Ahtisham" , 
    //     contact:"03010910933"

    // });
    res.sendFile(__dirname + "/public/index.html");
});

// Route to handle form submission
app.get("/submit", (req, res) => {
    // res.sendFile(__dirname + "/public/submit.html");
    // console.log(req.body);
    // res.send(`this is : ${res.body}`); // Log the form data to the console

res.send( [
    {name:"Ahtisham" , id: "1"} , 
    {name:"Ahti" , id: "2"} , 
    {name:"sham" , id: "2"} , 
]) ; 



});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
