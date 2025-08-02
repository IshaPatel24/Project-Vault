/*selecting the document element*/
let body = document.querySelector("body");
let level = document.querySelector("h3");
let playground = document.querySelector(".playground");
let boxes = document.querySelectorAll(".box");
let helpBtn = document.querySelector(".help");
let scoreCard = document.querySelector("h4");
let resetBtn = document.querySelector(".reset");
let displayBtn = document.getElementById("displayBtn")
let mainDiv = document.querySelector(".main-content")
let gameContent = document.querySelector(".game-content")

mainDiv.style.display = "none";

displayBtn.addEventListener("click",() => {
    gameContent.style.display = "none",
    mainDiv.style.display = "block"
})

/*starting the game */
let started = false;
let memoryArr = [];
let userArr = [];
let levelNum = 0;

let num = 0;
let clicks = 0; //displays the count of user's click
let score = 0;  //store the count of user's score

/*ensuring the click on box results into a valid input*/
playground.addEventListener("click",(event)=>{
    if(started){
        if(event.target.className == "box"){
            userFlash(event.target);
            clicks++;
            userArr.push(event.target.id);
            checker();
        }
    }
});

/*creating a blinking effect on the box to be selected by the user*/
function userFlash(box){
    box.classList.add("userFlash");

    setTimeout(()=>{
        box.classList.remove("userFlash");
    },200);
}

/*checking whether the computer input matches the user input*/
function checker(){
    if(userArr[clicks-1] != memoryArr[clicks-1]){
        // lost the game
        level.innerText = `You have lost the game and your score is ${score}`;
        started = false;
        userArr = [];
        memoryArr = [];
        clicks = 0;
        num = 0;

        /*adding a custom scorecard to display the score while the game is ON*/
        score = 0;
        scoreCard.innerHTML = `Score : ${score}`;
       
        body.classList.add("gameOver");
        setTimeout(()=>{
            body.classList.remove("gameOver");
        },500);

        levelNum = 1;
    }
    else{
        num++;
    }
    if(num == memoryArr.length && num!=0){
        score += 10;
        userArr = [];
        num = 0;
        clicks = 0;
        setTimeout(selectBox,500);
        /*adding a custom scorecard to display the score while the game is ON*/
        scoreCard.innerHTML = `Score : ${score}`;
        scoreCard.classList.add("ScoreFlash");
    }
}

/*building the core logic*/

// on pressing of any key the game will start 
body.addEventListener("keydown",()=>{
    if(started==false){
        started = true;
        selectBox();
    }
});

// Computer selecting any random among the four different boxes

function selectBox(){
    level.innerText = `Level ${levelNum}`; //initially = 0
    levelNum++;

    let randomVal = Math.floor(Math.random()*4); // [0,4)
    flashRandom(randomVal);

    memoryArr.push(boxes[randomVal].id);
}

/*to flash the random box selected by the system to the user*/

function flashRandom(randomVal){
    boxes[randomVal].classList.add("memoryFlash");

    setTimeout(()=>{
        boxes[randomVal].classList.remove("memoryFlash");
    },250);  // time is in miliseconds
}

/*help button should display the memory array as a hint to the user for few miliseconds*/

helpBtn.addEventListener("click",()=>{
    let initialText = level.innerText;

    level.innerText = `Memory array is ${memoryArr}`;

    setTimeout(()=>{
       level.innerText = initialText;
    },2000);

});

/*creating a reset button to restart the game*/

resetBtn.addEventListener("click",()=>{
    started = false;
    memoryArr = [];
    userArr = [];
    clicks = 0;
    levelNum = 0;
    num = 0;
    score = 0;
    level.innerText = `Press any key to restart`;
});