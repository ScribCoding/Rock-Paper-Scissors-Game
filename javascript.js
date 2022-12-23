




const images1 = document.getElementsByClassName("image_1");
const images2 = document.getElementsByClassName("image_2");
const buttons = document.getElementsByClassName("game");
const buttonPlay = document.getElementById("play");
const choices = ["rock","paper","scissors"];
let computerInput = "";
let user_score = 0;
let comp_score = 0;
let idle = true;
const resetButton = document.getElementById("reset");
resetButton.onclick = function(){
    reset_results();
    user_score = 0;
    comp_score = 0;
    $("#computer_score").html("CPU: " + comp_score);
    $("#user_score").html("YOU: " + user_score);

};
//middle
let middle_1 = document.getElementById("middle_2");




//selected
   
$("#rock_button").click(function(){
    if(isSelected() != true){
    $("#rock").removeClass("revealed").addClass("selected");
    }
});

$("#paper_button").click(function(){
    if(isSelected() != true){
    $("#paper").removeClass("revealed").addClass("selected");
    }
});

$("#scissors_button").click(function(){
    if(isSelected() != true){
    $("#scissors").removeClass("revealed").addClass("selected");
    }
});


    $("#rock_button").mouseenter(function(){
        if(isSelected() != true){
        $("#rock").removeClass("hidden").addClass("revealed");
        }
    });
    $("#rock_button").mouseleave(function(){
        $("#rock").removeClass("revealed").addClass("hidden");
    });
    
    $("#paper_button").mouseenter(function(){
       if(isSelected() != true){
        $("#paper").removeClass("hidden").addClass("revealed");
       }
     });
    $("#paper_button").mouseleave(function(){
        
        $("#paper").removeClass("revealed").addClass("hidden");
    });   

    $("#scissors_button").mouseenter(function(){
       if(isSelected() != true){
            $("#scissors").removeClass("hidden").addClass("revealed");
       }
    });
    $("#scissors_button").mouseleave(function(){
        $("#scissors").removeClass("revealed").addClass("hidden");
    });   

    isSelected = () => {
        if( ($("#rock").hasClass("selected"))||($("#paper").hasClass("selected"))||($("#scissors").hasClass("selected")) == true){
            return true;
        
        }
    };






const resultBoxes = document.getElementsByClassName("results");
let result_count=0;
let winCount = 0;
let loseCount = 0;
let selected = false;





buttonPlay.onclick = playTheGame;
setTimeout(function() {
    $("#rock_button").disabled = true;
 }, 3000);
//sets value of the button elements
for (let i = 0; i < buttons.length; i++) {
  buttons[i].value = choices[i];
  buttons[i].onclick = userChoice;
}

//PLAY FUNCTION//
function playTheGame(){

    if(selected==true){
        for(let button of buttons){
            button.disabled = true;
        }
        buttonPlay.disabled = true;
        resetButton.disabled = true;
        computerInput = computerChoice();
        for(let item of images2){
            if(item.id == computerInput){
                item.classList.add("selected2");
            }
        }
        winOrLoss(userInput, computerInput);

        setTimeout(() => {
            
            //after both choices are shown to the user
            selected = false;
            //removes selected from all the elements
            for(let item of images1){
                item.classList.remove("selected");
            }
            for(let item of images2){
                item.classList.remove("selected2");
            }
            buttons[1].style.color='black'
            buttons[2].style.color='black'
            buttons[0].style.color='black';
            buttonPlay.disabled = false;
            resetButton.disabled = false;
            for(let button of buttons){
                button.disabled = false;
            }
            gameOver(result_count);
          }, 1000);
    
    }

}




function computerChoice(){
computerInput = choices[Math.floor(Math.random() * choices.length)];
return computerInput;
}

function userChoice(){
    if(selected==false){
        userInput = this.value;
        for (let i = 0; i < buttons.length; i++) {
            if(buttons[i].value == this.value){
                this.style.color = 'red'
            }else{
                buttons[i].style.color = 'black';
            }
        }
        selected = true;
    }
    return userInput; 
}

let winOrLoss = (userInput, computerInput) => {
    
    if(userInput == computerInput){
        resultBoxes[result_count].style.backgroundColor = '#fba231';
        result_count++;
    
    }else if((userInput == "rock" && computerInput == "scissors") || (userInput == "paper" && computerInput == "rock") || (userInput == "scissors" && computerInput == "paper")  ){
        setTimeout(()=> {
            win();
        }, 300);
        resultBoxes[result_count].style.backgroundColor = '#057bf9';
        result_count++;
        winCount++;
        
        setTimeout(()=> {
            $(".rock2").attr("src","rock_w.png");
            $(".scissors2").attr("src","scissors_w.png");
            $(".paper2").attr("src","paper_w.png");    
        },1500)

    }else{
        lose();
        resultBoxes[result_count].style.backgroundColor = '#f43761';
        result_count++;
        loseCount++;
        setTimeout(()=> {
            $(".rock1").attr("src","rock_w.png");
            $(".scissors1").attr("src","scissors_w.png");
            $(".paper1").attr("src","paper_w.png");    
        },1400);

    }

}

let lose = () =>{
    $(".rock1").attr("src","rock_l.png");
    $(".scissors1").attr("src","scissors_l.png");
    $(".paper1").attr("src","paper_l.png");
};

let win = () =>{
    $(".rock2").attr("src","rock_l.png");
    $(".scissors2").attr("src","scissors_l.png");
    $(".paper2").attr("src","paper_l.png");
}


let gameOver = (result_count) => {
    if(result_count == 5){
        $("#popup").removeClass("popup_hidden").addClass("popup_revealed");
        for(let button of buttons){
            button.disabled = true;
        }
        buttonPlay.disabled = true;
        resetButton.disabled = true;
        idle_animation();
        if(winCount == loseCount){
            document.getElementById("matchEnd").innerHTML = "YOU TIED";
            document.getElementById("matchEnd").style.color = "#fba231";  
        }
        if(winCount < loseCount){
            document.getElementById("matchEnd").innerHTML = "YOU LOST";
            document.getElementById("matchEnd").style.color = "#f43564";
            comp_score++;
            $("#computer_score").html("CPU: " + comp_score);
        }
        if(winCount > loseCount){
            document.getElementById("matchEnd").innerHTML = "YOU WON";
            document.getElementById("matchEnd").style.color = "#057bfa";
            user_score++;
            $("#user_score").html("YOU: " + user_score);
        }   
    }
}


//POPUP
$("#popup_button").click(function(){
    $("#popup").removeClass("popup_revealed").addClass("popup_hidden");
    for(let button of buttons){
        button.disabled = false;
        buttonPlay.disabled = false;
        resetButton.disabled = false;
        idle_animation();
        reset_results();
    }         
});  

function reset_results(){
    setTimeout(() => {
    document.getElementById("matchEnd").innerHTML = "";
    }, 1000);
    result_count= 0;
    winCount = 0;
    loseCount = 0;
    for (let i = 0; i < resultBoxes.length; i++) {
        resultBoxes[i].style.backgroundColor='grey';
      }
    userInput ="rock";
    computerInput ="";
    buttons[1].style.color='black'
    buttons[2].style.color='black'
    buttons[0].style.color='black';
    for(let item of images1){
        item.classList.remove("selected");
    }
}

idle_animation = () => {
    setTimeout(()=> {
        $("#r1").toggleClass("idle");
    },100)
    setTimeout(() => {
        $("#r2").toggleClass("idle");    
    }, 200);
    setTimeout(() => {
        $("#r3").toggleClass("idle");    
    }, 300);
    setTimeout(() => {
        $("#r4").toggleClass("idle");    
    }, 400);
    setTimeout(() => {
        $("#r5").toggleClass("idle");    
    }, 500);
}

