window.addEventListener("scroll",function(){
    const navbar = this.document.getElementById("mynav")
    if (this.window.scrollY>=50){
        navbar.classList.add("Scrolled")
    } else{
        navbar.classList.remove("Scrolled")
    }
})

window.addEventListener("DOMContentLoaded",function(){
    const button = this.document.querySelector(".navbar-toggler")
    button.addEventListener("click",function(){
        if(window.scrollY<50){
            window.scrollBy(0, 51 - window.scrollY);
        }
    })

})