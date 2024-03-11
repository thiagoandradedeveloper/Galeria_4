
window.onload = function(){
    
    let buttons = document.querySelectorAll("#container button");
    let doc = document.documentElement;
    let draging = false, prevPageX;
    let container = document.querySelector("#container");

    function imgs(){
        return document.querySelectorAll("#container img");
    }
    
    buttons[0].addEventListener("click",function(){
        container.prepend(imgs()[imgs().length-1]);
    })

    buttons[1].addEventListener("click",function(){
        container.append(imgs()[0]);
    })

    imgs().forEach(element => {
        element.addEventListener("mousedown",()=>{
            element.style.cursor = "grabbing";
        });
        element.addEventListener("mouseup",()=>{
            element.style.cursor = "pointer";
        });
        element.addEventListener("mouseleave",()=>{
            element.style.cursor = "pointer";
        });
    })
    
    container.addEventListener("mousedown",function(e){
        e.preventDefault(e);
        draging = true;
        prevPageX = e.pageX;
    })
    function mouseOut(e){
        
        e.preventDefault();
        draging = false;

        imgs().forEach(element=>{
            element.style.transition = "0.3s";
        })

        let valorMinimo = 0;

        if(prevPageX > e.pageX){

            if((prevPageX - e.pageX) > valorMinimo){
                container.append(imgs()[0]);    
            }
            doc.style.setProperty("--position", "0px");

        } 
        if(prevPageX < e.pageX){

            if((e.pageX - prevPageX) > valorMinimo){
                container.prepend(imgs()[imgs().length-1]);
            }
            doc.style.setProperty("--position", "0px");

        }
    } 
    container.addEventListener("mouseleave",function(e){
        if(draging) mouseOut(e);
    })
    container.addEventListener("mouseup",function(e){
        if(draging) mouseOut(e);
    })
    container.addEventListener("mousemove",function(e){

        if(!draging) return;
        
        imgs().forEach(element=>{
            element.style.transition = "0s";
        })

        e.preventDefault();
        let positionDiff = e.pageX - prevPageX;   
        doc.style.setProperty("--position", positionDiff + "px");

    })
}