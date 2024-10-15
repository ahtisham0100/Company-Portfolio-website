const fs = require("fs"); 

// fs.writeFile("new.text" ,"Hello this is me Ahtisham ." , (err)=>{ 
// if (err) {
//    console.log(err);
// } else { 
//  console.log("File has been successfully created!");
// }
// }); 


fs.readFile("new.text",(err, data)=> {
if (err) {
    console.log(err);
}else{ 
    console.log("read the file successfully \n " + data);
}
}); 
 
fs.rename("newmessage.pptx" , "message.txt" , ()=>{
    console.log("File renamed successfully");
});