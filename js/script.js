const body=document.querySelector('body');
const slider=document.querySelector('#slider');
const container=document.querySelector('.container');
const slidervalue=document.querySelector('#slidervalue');
const fillButton=document.querySelector('.fillButton');
let mouseButton=null;
let gridChildren=null;

const canvasSize=[4,8,16,32,64];
slider.value=1;


// Fill button
let fill=false;
fillButton.addEventListener("click",()=>{
    if (fill){
        fill=false;
        fillButton.style['background-color']="lightsteelblue";
    }
    else{
        fill=true;
        fillButton.style['background-color']="steelblue";
    }
})

// ------------------------------------------------------------------------------

function destroyGrid(){
    const children=document.querySelectorAll('.gridChild');
    children.forEach((child)=>container.removeChild(child));
}

function colorGrid(){
    mouseButton=null;
    gridChildren=document.querySelectorAll('.gridChild')
    function colorPixel(child,mouseButton){
        switch(mouseButton){
            case null:
                break;
            case 0:
                if (!fill){
                child.classList.add("gridChild--colored");
                child.style['background-color']=`${color}`;
                break;
                }
                else{
                    gridChildren.forEach((child)=>{
                        child.style['background-color']=`${color}`;
                    })
                    break;
                }

            case 2:
                child.classList.remove("gridChild--colored");
                /* child.style['background-color']=`${body.style['background-color']}`; */
                child.style['background-color']=`transparent`;
                break;
        }
    }

    gridChildren.forEach((child)=>{
        child.addEventListener('mousedown',(e)=>{
            mouseButton=e.button;
            colorPixel(child,mouseButton);
        });

        child.addEventListener('mouseup',(e)=>{
            mouseButton=null;
        });

        window.addEventListener('mouseup',()=>{
            mouseButton=null;
        })

        child.addEventListener('mouseover',(e)=>{
            child.style['cursor']="cell";
            if (mouseButton!=null) colorPixel(child,mouseButton);
        });

    });
}

function createGrid(value){
    container.style['grid-template-columns']=`repeat(${value},1fr)`;
    for (i=1;i<=value**2;i++){
        const div=document.createElement('div');
        div.classList.add('gridChild');
        container.appendChild(div);
    }
    colorGrid();
}

// --------------------------------------------------------

createGrid(8); // Create initial grid when page loads

/////////////////// EVENT LISTENERS

slider.addEventListener('change',(e)=>{
    const value=canvasSize[parseInt(e.target.value)];
    slidervalue.textContent=`${value}x${value}`;
    destroyGrid();
    createGrid(value);
});

// -------------------------------------------------------

// CLEAR button

const clearButton=document.querySelector('.clearButton');
clearButton.addEventListener("click",()=>{
    gridChildren.forEach((child)=>{
        child.style['background-color']=`transparent`;
    })
});

// Grid button
let gridTrigger=true;
const gridButton= document.querySelector('.gridButton');
gridButton.addEventListener("click",()=>{
    if (gridTrigger==false){
        gridTrigger=true;
        gridButton.style['background-color']="white";
        gridChildren.forEach((child)=>{
            child.style['border']=`1px solid #00000075`;
        })
    }
    else if (gridTrigger==true){
        gridButton.style['background-color']="#777";
        gridTrigger=false;
        gridChildren.forEach((child)=>{
            child.style['border']="none";
        })
    }
})

// Instruction button
const instructionsButton=document.querySelector('.instructionButton')
let instructionsTrigger=false;
instructionsButton.addEventListener("click",()=>{
    if (!instructionsTrigger){
        instructionsTrigger=true;
        instructions.style['display']="block";
    }
    else {
        instructionsTrigger=false;
        instructions.style['display']="none";
    }
})
