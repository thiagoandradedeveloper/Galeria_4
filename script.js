
window.onload = function(){
    
    let buttons = document.querySelectorAll("#container button");
    let doc = document.documentElement;
    let draging = false, prevPageX;
    let container = document.querySelector("#container");
    let conteinerButtons = document.querySelector("#containerBtns");
    let contolerNumber = 0;

    function avancar(){
        container.append(imgs()[0]);
        changerButton(1);
    }
    function voltar(){
        container.prepend(imgs()[imgs().length-1]);
        changerButton(-1);
    }
    
    function imgs(){
        return document.querySelectorAll("#container img");
    }

    function changerButton(value){
        
        let btnSetar = document.querySelectorAll("#containerBtns span");
        contolerNumber += value;
        
        if(contolerNumber < 0) contolerNumber = btnSetar.length - 1;
        if(contolerNumber > (btnSetar.length - 1)) contolerNumber = 0;

        btnSetar.forEach((element,index) => {
            
            if(index == contolerNumber){
                element.style.background = "yellow";
            } else {
                element.style.background = "blue";
            }

            element.addEventListener("mousedown",(e)=>{

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                if(index != contolerNumber){

                    let pulos, re, av, cond = null;
                    re = index - contolerNumber;
                    
                    if(re > 0){
                        av = contolerNumber + (imgs().length - index);
                    } 
                    if(re < 0){
                        av = index + (imgs().length - contolerNumber);
                    }            
    
                    pulos = Math.min(Math.abs(re),Math.abs(av));
    
                    tamanho = imgs().length / 2;
                    
                    if(Math.abs(re) > tamanho){
                        if(re < 0) cond = "a";
                        if(re > 0) cond = "r";
                    }
                    if(Math.abs(re) < tamanho){
                        if(re < 0) cond = "r";
                        if(re > 0) cond = "a";                    
                    }
                    if(Math.abs(re) == tamanho)  cond = "a";
    
                    console.log(cond + pulos)
    
                    let contador = 0;
                    let mover = setInterval(function(){
                        if(cond == "a") avancar();
                        else voltar();
                        if(element.style.background == "yellow") clearInterval(mover)
                    }, 1);
                }                
            })
        })
    }
    
    buttons[0].addEventListener("click",function(){
        voltar();
    })

    buttons[1].addEventListener("click",function(){
        avancar();
    })

    imgs().forEach((element,index) => {

        element.addEventListener("mousedown",()=>{
            element.style.cursor = "grabbing";
        });

        element.addEventListener("mouseup",()=>{
            element.style.cursor = "pointer";
        });

        element.addEventListener("mouseleave",()=>{
            element.style.cursor = "pointer";
        });

        let buttonControler = document.createElement("span");
        buttonControler.id = index;
        buttonControler.textContent = " ";
        conteinerButtons.appendChild(buttonControler);

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

        let valorMinimo = 100;

        if(prevPageX > e.pageX){

            if((prevPageX - e.pageX) > valorMinimo){
                avancar();
            }
            doc.style.setProperty("--position", "0px");

        } 
        if(prevPageX < e.pageX){

            if((e.pageX - prevPageX) > valorMinimo){
                voltar();
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

    });
    
    changerButton(0);
    
    let automatico;
    container.addEventListener("mouseout",function(){
        automatico = setInterval(avancar,10000);
    })
    container.addEventListener("mouseover",function(){
        clearInterval(automatico);
    })

    doc.addEventListener("keydown",function(e){
        e.preventDefault();
        if(e.key == "ArrowRight") avancar();
        if(e.key == "ArrowLeft")  voltar();
    })
}