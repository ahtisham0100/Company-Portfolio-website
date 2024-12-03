import morgan from "morgan" ;
import  express from "express"; 
import  path, { dirname } from  "path"; 
import  {fileURLToPath} from "url";
import bodyParser from "body-parser";



const __filename =  fileURLToPath(import.meta.url); 
const _dirname  = path.dirname(__filename);

const app = express(); 
app.set('trust proxy ', true);

const port = 3000; 
app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended:true}));
 
 app.get("/" , (req,res)=> { 
    res.sendFile(_dirname + "/public/index.html");
 }) 
    

 app.post("/login" , (req,res)=> {  
    const ipAddress =  req.ip;
console.log(req.body); 
res.send(`Logged in  on the ip Address ${ipAddress}`);
 })

app.listen(port , (req, res)=>{ 
    console.log(`listening on the port ${port} `);
});