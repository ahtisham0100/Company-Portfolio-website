 
 /**
  * regex is the regular expression and it is used to search / performs operations on the substring of characters in javascript.
  * operations can be: 
  * * * replacing a substring 
  * * 
  */
   
 //example ; 

 const  regex  = /very/g ;
   //it means we want to search for very globally in a string later in our code ; 

 var aboutme =  "I am a very and obviously very nice boy says a very very nice boy."  ;
  
 //applying a regex to replace very with extremely .
  
  console.log(aboutme.replace(regex , "Extremely")); 
   

  aboutme.replace(/Extremely/g,"VERY") ;
   console.log(aboutme);
  
   
