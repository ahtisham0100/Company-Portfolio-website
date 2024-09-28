 //selecitng all elements with poster-area  class
 const observer = new IntersectionObserver( (entries)=>{ 
entries.forEach( (entry)=>{
    if (entry.isIntersecting) {
        entry.target.classList.add(".show")
    } else {
        entry.target.classList.remove(".show")

    }
} );
 }) ;


const posterAreaElements =document.querySelectorAll(".poster-area");
posterAreaElements.forEach( (el)=> {
IntersectionObserver(el);
} ); 