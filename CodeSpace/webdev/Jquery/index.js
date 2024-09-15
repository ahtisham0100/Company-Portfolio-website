alert("working");
$(".para").css( {"size" : "45px",
    "font-size" : "45px" ,
    "background-color" : "blue" , 
    "color":"whitesmoke" ,
    "display":"flex" , 
    "flex-wrap":"wrap", 
    "border-radius" : "1rem 1rem  "
 });
  
var txtcontrol = 0;  
var txt =  $(".container .para").text(); 
  $(".para").click( ()=> {
 if (txtcontrol !=1) {
    console.log(txtcontrol);
    $(".container .para").text("Inner Text changed afer para is clicked");
txtcontrol++;  
} else {
    console.log(txtcontrol);
    $(".container .para").text(txt); 
    txtcontrol=0;
}

    
  }) 


  //changing the styling of buttons  

  $("button.btn").css( 
    {
        "background-color":"Whitesmoke", 
        "color"  : "Navy" ,  
        "font-size":"20px" , 
        "padding" : "4px"  ,
        "inner-radius": "16px" , 
  "outer-radius" : "20px",
  "width" : "AUTO",
  "height" : "AUTO" , 
    }
  ) 



  //mouse click event listening 

  $("button.btn").click( function () { 

    let button =  this;  
    button.style.backgroundColor= "tomato" ;
alert(this.html());
    setTimeout( function (){
        button.style.backgroundColor="whitesmoke";
        button.style.color="black";

    }, 100) ;
   
})  ; 



//hover 
$("button.btn").hover(
    function () {
        this.style.backgroundColor = "navy";     
        this.style.color ="#f5f5f5";
        
    }
     , 
function () {

    /*
    this.style.backgroundColor="whitesmoke"; 
    this.style.color="black";

*/

//altereing css
$(this).css( {
    "background-color" : "whitesmoke" , 
    "color": "black" ,
    "border" : "1px solid black" ,
    "border-radius" : "0px 0px 5px 5px",
});
}

    );

    $("button").html("<em>TEXT CHANGED </em>");

 //manipulating the input feedback 
  
 console.log();


 //event listening using keyboard
$("#feedback").keypress( function (e){

    alert(e.key + "  was just pressed !");
}) ;


 $("input").click( function () {
    $("input").attr("  placeholder", ""); 


 })  


 