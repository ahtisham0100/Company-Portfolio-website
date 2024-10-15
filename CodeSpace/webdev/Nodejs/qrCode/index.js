import inquirer from "inquirer"; 
// using inquirer to get prompt from the user. 
import  fs from "fs"; 

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
    }  , 
     
    {
        message: "Enter the UserName ? " ,  
        name : "username"
    } , 
     
     {
        message: "Enter the password ? " , 
        name:"password"
     }

  ])
  .then((answers) => {
console.log(answers); 

const  data =  

fs.writeFile("data.txt", answers.naam  , function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("success full") ;
    }
}) 

})
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });