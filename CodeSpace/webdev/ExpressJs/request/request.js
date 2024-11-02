import express, { response } from "express";
import bodyParser from "body-parser";
import path from "path";
import { error, log, time } from "console";
import fs from "fs"; 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
 
fs.writeFile("public/requests.txt" , "File containing the requests record." , (error)=>{ 
    if (error) {
        console.log(error);
    }else { 
        console.log("File created")
    }
});
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
 


const myLogger = function (req, res, next) {
    console.log('LOGGED') ; 
//first of all when any of the request is sent 
//this middlewire will be called and it will trigger the next middleware

  next() ;
}
   

//requestTime middleware will be called after above middleware and it will than trigger the request to completed.
const requestTime = function (req, res, next) {
    const date= new Date(); 
    var sec,hr,min; 
    sec =date.getSeconds();
hr=date.getHours(); 
min=date.getHours();

    req.requestTime = `requst Time:${hr}:${min}:${sec}`; 
    console.log(req.requestTime);  


fs.appendFileSync("public/requests.txt" , `${req.requestTime}   request source ${req.method}   ${req.params}  ${req.headers}\n  `)

    next()
  } 




app.use(myLogger);
app.use(requestTime);


//  app.get("/" , (req,res,next)=>{
//      console.log(req.query + "  - " +req.url);
//      next();
// }) ;

//we want our express app to use this middleware so; 


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