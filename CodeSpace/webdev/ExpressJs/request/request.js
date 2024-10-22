import express, { response } from "express";
import bodyParser from "body-parser";
import path from "path";
import { log } from "console";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
 
/**
 * understanding the middle ware 
 *  it is functions which performs some operations before moving 
 * to the next request hander  
 * after performing the funcntions it calls the next();  
 * 
 * it can be used before every request or before a paricular request 
 * only 
 * here is how we implement it;
 */
 
 
const middleWare =  app.get("/" , (req,res,next)=>{
     console.log(req.query + "  - " +req.url);
     next();
}) ;

//we want our express app to use this middleware so; 

app.use(middleWare);

const mockUsers = [
    { id: 1, name: "Ahtisham" },
    { id: 2, name: "Muhammad" },
    { id: 3, name: "Ali" }
];

app.get("/pc/users", (req, res) => {
    res.send(mockUsers);
});

app.get("/pc/users/:id", (req, res, next) => {

    const parsedid = parseInt(req.params.id,10);

    if (isNaN(parsedid)) {
        res.status(400).send({ msg: "Bad request !" });
    } else {
        
        var target = mockUsers.find( (user)=> user.id===parsedid) ; 
         
        console.log(target);
        

        //if user does'nt exist; 
        if (target) {
            res.json({target});
        } else { 
            res.sendStatus(404); 
console.log("user not found !");
        }

    }
    }
);


app.get("/:id", (req, res) => {

    const users = [{ id: 1, name: "Ahtisham" },
    { id: 2, name: "Sam" },
    { id: 3, name: "tom" }];

    console.log(req.params);


    res.send(users);

});


app.listen(port, () => {
    console.log(`Listening on the port ${port} .`);

})