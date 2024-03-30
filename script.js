//Setting up variables to access elements and add actions

let boxes = document.querySelectorAll(".boxX");
let resetBtn = document.querySelector("#resetBtn");
let winningMsg = document.querySelector("#winnerMsg")
let newGameBtn = document.querySelector("#newGameBtn");
let msgContainer = document.querySelector(".msgContainer");
let turnX= true;
let count=0;

// All wiining patterns -- precalcualted manually
const winningPatters = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//reset Game button function
const resetGame=()=> {
    turnX=true;
    count=0;
    msgContainer.classList.add("hide");
    boxes.forEach((box)=>{
        box.innerText="";
        box.disabled=false;
    });

};

//adding event listening to 'new game' and 'reset game' buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// adding functionality to boxes with logic of whos turn is next 'O' or 'X'
boxes.forEach((box)=>{
    box.addEventListener("click", () =>{
        if(turnX){ 
            //PLayer X's Turn
            box.innerText = "X";
            turnX=false;
            box.classList.remove("boxO");
        } else { 
            //Player O's Turn
            box.innerText = "O";
            turnX=true;
            box.classList.add("boxO");
        }
        //disabling the button after once used
        box.disabled=true;
        //keeping count to check draw scenarios
        count++;
        let isWinner = checkWinner();
        //ifDraw Condition
        if(count===9 && !(isWinner)){
            gameDraw();
        }
    });
});

//function to disable boxes
const disableBoxes =()=>{
    boxes.forEach((box)=>{
        box.disabled=true;
    })
} ;

// **NOTE ** functoin to enable boxes can also be used

// show Winner function that also displays who the winner is and changes visibility mode of winning message on HTML
const showWinner = (winner) =>{
 winningMsg.innerText = `Congratulations!! Winner is ${winner}`;
 msgContainer.classList.remove("hide");
};

// Draw mode option
const gameDraw = () =>{
    winningMsg.innerText="This game was a Draw. Let's PLAY AGAIN.";
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const checkWinner = () => {
    winningPatters.forEach((winArray)=>{
        
        let val1 = boxes[winArray[0]].innerText;
        let val2 = boxes[winArray[1]].innerText;
        let val3 = boxes[winArray[2]].innerText;

        if(val1!="" && val2!="" && val3!=""){

        if (val1===val2 && val2 === val3){
            disableBoxes();
            showWinner(val1);
            count=0;
        }
    }

    })
};
