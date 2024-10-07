var pw =  require("silly-password-generator");
 var password = pw.generateSillyPassword({wordCount:2}); 

 console.log('The Silly password is ${password}: ' + password);