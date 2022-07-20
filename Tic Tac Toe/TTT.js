let cnt=0;
let music=new Audio("soundimg/music.mp3");
let turn=new Audio("soundimg/ting.mp3");
let gameover=new Audio("soundimg/gameover.mp3");
let turnxo="X";
let vistedarr=[-1,-1,-1,-1,-1,-1,-1,-1,-1];
let gameover1=false;
const changeturn=()=>{
    return turnxo==="X"?"O":"X";
}
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.info').textContent = boxtext[e[0]].textContent + " Won";
            gameover1 = true;
            document.querySelector('.image').getElementsByTagName('img')[0].style.width = "300px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    })
}
let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let boxtext=element.querySelector('.boxtext');
    element.addEventListener('click',(e)=>{
        if(boxtext.innerText==='' && !gameover1){
            boxtext.innerText=turnxo;
            if(turnxo=="X"){
                boxtext.style.color="rgba(233, 187, 80, 0.922)";
            }
            else{
                boxtext.style.color="gainsboro";
            }
            turnxo=changeturn();
            turn.play();
            checkWin();
            if(!gameover1)
            { 
                document.getElementsByClassName("info")[0].innerText="Turn For "+turnxo;
            }
        }
    })
})
reset.addEventListener('click',()=>{
    //console.log('clicked');
    let boxtext=document.querySelectorAll(".boxtext");
    Array.from(boxtext).forEach(element=>{
       element.textContent="";
    });
    turnxo="X";
    gameover1 = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turnxo;
    document.querySelector('.image').getElementsByTagName('img')[0].style.width = "0px"
})
