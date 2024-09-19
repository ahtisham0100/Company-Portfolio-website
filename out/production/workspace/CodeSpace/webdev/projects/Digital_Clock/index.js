
var minute =43; 
var second =30;
var hours =04;
  


$(".mins").text(minute);
$(".sec").text(second);
$(".hrs").text(hours);
 

    $(".changeTheme").click( ()=>{
        $(".light").toggleClass("dark");
        console.log("theme changed");
    });

    setInterval( function () {
       if(minute==59 && second===59 && hours==23) {
minute=0; 
second=0;
hours=0;
$(".mins").text("0"+minute);
$(".sec").text("0"+second);
$(".hrs").text("0"+hours);
       }
       else if (second===59) {
        $(".sec").text(second);
        second=0;
        minute++; 
        if (minute<10) {
 $(".sec").text(second);
            var mins =  "0"+minute;
            $(".mins").text(mins);
        } else if (minute>10)
            if(minute>59) {
 $(".sec").text(second);
        minute=0;
        $(".mins").text(minute);
        hours++; 
        $(".hrs").text(hours);        
        } else {
                    $(".mins").text(minute);
                }
       } 
      else {
        if (second<9) {
            second++; 
            var sec= "0"+second;
            $(".sec").text(sec);
        } else {
            second++;
            $(".sec").text(second);
         
        }
        
    }  
      

    }, 1000);
