import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const fn = fileURLToPath(import.meta.url);
const dirname = path.dirname(fn);
const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(dirname, "public", "index.html")
    )
})

app.post("/advice", (req, res, next) => {

   let advice = Number(req.body.day);
    
    if (advice <= 5) {
       advice= "weekday , Work harder  , push your boudaries  , achive your goals";

    } else {
         advice = "weekend , Have fun , party with friends or watch a movie .";

    }
 
    console.log(advice); 
res.render("index" , { advice });

})

app.listen(port, () => {
    console.log(`listening on ${port}`);

})