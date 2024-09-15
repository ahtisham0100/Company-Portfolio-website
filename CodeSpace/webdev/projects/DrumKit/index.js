    
   
   
   
   /* 
    * playing audio in js 
     
var audio = new Audio('audio_file.mp3');
audio.play();


to play an audio inside js we have to make an audio object and than play that object.
      */ 
      

/** we 
* can apply the switch statement to play the sound depending upon which button is pressed.
*/

    

/* this loop adds EventListener to all the drums sticks all at once instead of us writing same statements again and again for n drum sticks */ 

function makeSound(key) {

    
    switch (key) {
        case "w" || "W":
                var audio = new Audio("sounds/crash.mp3");
                audio.play();
            break;
            case "a":
                var audio = new Audio("sounds/kick-bass.mp3");
                audio.play();
            break;
       
            case "s":
                var audio = new Audio("sounds/snare.mp3");
                audio.play();
            break;
       
            case "d":
                var audio = new Audio("sounds/tom-1.mp3");
                audio.play();
            break;
       
            case "j":
                var audio = new Audio("sounds/tom-2.mp3");
                audio.play();
            break;
       
            case "k":
                var audio = new Audio("sounds/tom-3.mp3");
                audio.play();
            break;
       
            case "l":
                var audio = new Audio("sounds/tom-4.mp3");
                audio.play();
            break;

            default: 
        
    }
    
}


/**
 * function to make button press animation
 */


function pressAnimation(keyPressed) {
    
    document.querySelector("."+keyPressed).classList.add("btnAnimation");
    
    setTimeout(function () {
        document.querySelector("."+keyPressed).classList.remove("btnAnimation");
    },200) ;

}

for (let index = 0; index <document.querySelectorAll(".drum").length; index++) {

    /* line below is to test if Event listener is perfectly added by printing in console its index position */
    console.log("EventListener added to btn at index : " + index);

    document.querySelectorAll(".drum")[index].addEventListener("click" , function () {
        btnPressedInnerText=this.innerText; 
       makeSound(btnPressedInnerText);
       pressAnimation(btnPressedInnerText);
        });
           
  
   
   }
   

 
document.addEventListener("keydown",function (event){
       
    var keynum = (String)(event.key.toLowerCase());
    //converting the ket ro lower case
       console.log(keynum);
       
       makeSound(keynum);
       pressAnimation(keynum);
       
      } );
 
 

