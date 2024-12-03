// var pw =  require("silly-password-generator"); 
import  {generateSillyPassword} from "silly-password-generator";  

//  var password = pw.generateSillyPassword({wordCount:2}); 
 
// generateSillyPassword({wordCount:3});
var count = 10; 
var password  = generateSillyPassword({wordCount:count}) ;
 console.log(`The Silly password is : ${password}  `);
