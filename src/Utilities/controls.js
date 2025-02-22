function keyPressed(){
  if(mode ==! 1){
    if(keyCode == ENTER){
      //do guess
      result = sessionComputle.guess()
      let isVisible = goAgain.elt.style.display !== "none";
      if(isVisible){
        newcomputle()
      }
      if(result == true){
        goAgain.show()
      }
      
    }
    if(keyCode == BACKSPACE){
      sessionComputle.removeLetter()
    }
    if(keyCode >=65 && keyCode <=90){
      let inputLetter = String.fromCharCode(keyCode)
      // console.log("input letter",inputLetter)
      sessionComputle.inputLetter(inputLetter)
    }
    if(keyCode >=48 && keyCode <=57){
      let inputLetter = String.fromCharCode(keyCode)
      // console.log("input letter",inputLetter)
      sessionComputle.inputLetter(inputLetter)
    }

    
  }
  if(mode == 5){

    if(keyCode == BACKSPACE){
      sessionComputle.removeLetter()
    }
    //MultiplayerMode
    if(multiplayerMode == true){
      if(isHost == true){
        shared_game_data.player1.guessKey = keyCode 
        if(keyCode == ENTER){
          //do guess
          result = sessionComputle.guess()
          let isVisible = goAgain.elt.style.display !== "none";
          if(isVisible){
            newcomputle()
            shared_game_data.player1 = { 
              phrase: sessionComputle.phrase, 
              topic: sessionComputle.topic, 
              guessKey: null, 
              score: userdata.score, 
              streak: answerStreak 
            };
          }
          if(result == true){
            goAgain.show()
          }
          
        }
        if(keyCode >=65 && keyCode <=90){
          let inputLetter = String.fromCharCode(keyCode)
          // console.log("input letter",inputLetter)
          sessionComputle.inputLetter(inputLetter)
        }
        if(keyCode >=48 && keyCode <=57){
          let inputLetter = String.fromCharCode(keyCode)
          // console.log("input letter",inputLetter)
          sessionComputle.inputLetter(inputLetter)
        }
      }else{
        shared_game_data.player2.guessKey = keyCode 
        if(keyCode == ENTER){
          //do guess
          result = sessionComputle.guess()
          let isVisible = goAgain.elt.style.display !== "none";
          if(isVisible){
            newcomputle()
            shared_game_data.player2 = { 
              phrase: sessionComputle.phrase, 
              topic: sessionComputle.topic, 
              guessKey: null, 
              score: userdata.score, 
              streak: answerStreak 
            };
          }
          if(result == true){
            goAgain.show()
          }
          
        }
        if(keyCode >=65 && keyCode <=90){
          let inputLetter = String.fromCharCode(keyCode)
          // console.log("input letter",inputLetter)
          sessionComputle.inputLetter(inputLetter)
         
        }
        if(keyCode >=48 && keyCode <=57){
          let inputLetter = String.fromCharCode(keyCode)
          // console.log("input letter",inputLetter)
          sessionComputle.inputLetter(inputLetter)
         
        }
      }
    }
  }
  
}

function detectDevTools() {
  const start = performance.now();
  debugger;  // Pause the execution
  const end = performance.now();

  if (end - start > 100) {  // If debugger pauses execution for more than 100ms
    alert("Cheating detected! Please Reload Page");  // Show alert
    noLoop();  // Stop the p5.js loop to stop the game
  }
}