// using inquirer to get prompt from the user fs to write the file and qr-image to generate the qr-code . 

import inquirer from "inquirer"; 
import  fs from "fs";  
import qr from "qr-image"; 
import { type } from "os";
import { types } from "util";
inquirer
  .prompt([
    /* Pass your questions in here */ 

    /**since the questions are objects so we write them the  object way; */
     
    {message:"Enter the url to generate the QR-CODE ? ",
       name: "url"  
    } ,  

    {
        message: "enter your name",
        name: "naam"
        
    }, 
    { 
        message: "type of image for QR-Code : pdf , efd, png  , png ", 
        name : "type"
    }   

  ])
  .then((answers) => {
console.log(answers); 

const  data =  answers.naam  + " \n" + answers.password + "\n " + answers.url + "\n" +answers.username;

fs.writeFile("data.txt", data  , (error)=> {
    if (error) {
        console.log(error);
    } else {
        console.log("success full") ;
    }
}); 

const img =  qr.image(answers.url , {type:answers.type});
img.pipe(fs.createWriteStream(answers.naam+'.png')); 


})
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });