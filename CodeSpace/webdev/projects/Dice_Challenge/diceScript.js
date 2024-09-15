let num1=   Math.floor(Math.random()*5 +1); 
let num2= Math.floor(Math.random()*5 +1);

console.log(num1 +" num2 : " + num2);
let imgOneAddrees = "images/dice"+num1+".png";
let imgTwoAddress="images/dice"+num2+".png";

    
if (num1==num2) {
   
  

    document.querySelector("h1").innerText="\nCome Again...";
    
    document.querySelector("div .img1").setAttribute("src",imgOneAddrees);

document.querySelector("div .img2").setAttribute("src",imgTwoAddress); 


}  else {
if (num2>num1) {
    document.querySelector("h1").innerText="Team2 Plays First";
} else if(num2<num1){
    document.querySelector("h1").innerText="Team1 Plays First";
}
    
document.querySelector("div .img1").setAttribute("src",imgOneAddrees);

document.querySelector("div .img2").setAttribute("src",imgTwoAddress); }



