// Define local buffers and flags for host and client
let localBufferHost = [];
let localBufferClient = [];
let hostBufferInterval;
let clientBufferInterval;
let hostBufferIntervalRunning = false;
let clientBufferIntervalRunning = false;

function keyPressed() {
  // Non-multiplayer mode (mode not equal to 1)
  if (mode !== 1 && mode !==5) {
    if (keyCode === ENTER) {
      result = sessionComputle.guess();
      let isVisible = goAgain.elt.style.display !== "none";
      if (isVisible) {
        newcomputle();
      }
      if (result === true) {
        goAgain.show();
      }
    }
    if (keyCode === BACKSPACE) {
      sessionComputle.removeLetter();
    }
    if (keyCode >= 65 && keyCode <= 90) {
      let inputLetter = String.fromCharCode(keyCode);
      sessionComputle.inputLetter(inputLetter);
    }
    if (keyCode >= 48 && keyCode <= 57) {
      let inputLetter = String.fromCharCode(keyCode);
      sessionComputle.inputLetter(inputLetter);
    }
  }
  
  // Multiplayer mode (mode == 5)
  if (mode === 5) {
    if (keyCode === BACKSPACE) {
      sessionComputle.removeLetter();
    }
    
    if (multiplayerMode === true) {
      // For Host (player1)
      if (isHost === true) {
        // Instead of pushing directly, push into localBufferHost
        localBufferHost.push(keyCode);
        
        // Start interval if not already running
        if (!hostBufferIntervalRunning) {
          hostBufferIntervalRunning = true;
          hostBufferInterval = setInterval(() => {
            if (localBufferHost.length > 0) {
              // Take one key from the buffer and push into the shared guessQueue
              let k = localBufferHost.shift();
              shared_game_data.player1.guessQueue.push(k);
            } else {
              clearInterval(hostBufferInterval);
              hostBufferIntervalRunning = false;
            }
          }, 500); // 100ms delay between pushes
        }
        
        // Process immediate actions for ENTER and letters as needed:
        if (keyCode === ENTER) {
          result = sessionComputle.guess();
          let isVisible = goAgain.elt.style.display !== "none";
          if (isVisible) {
            newcomputle();
            // Reset player1 data on guess:
            shared_game_data.player1 = { 
              phrase: sessionComputle.phrase, 
              topic: sessionComputle.topic, 
              guessQueue: [], 
              score: userdata.score, 
              streak: answerStreak 
            };
          }
          if (result === true) {
            goAgain.show();
          }
        }
        if (keyCode >= 65 && keyCode <= 90) {
          let inputLetter = String.fromCharCode(keyCode);
          sessionComputle.inputLetter(inputLetter);
        }
        if (keyCode >= 48 && keyCode <= 57) {
          let inputLetter = String.fromCharCode(keyCode);
          sessionComputle.inputLetter(inputLetter);
        }
        
      // For Client (player2)
      } else {
        localBufferClient.push(keyCode);
        if (!clientBufferIntervalRunning) {
          clientBufferIntervalRunning = true;
          clientBufferInterval = setInterval(() => {
            if (localBufferClient.length > 0) {
              let k = localBufferClient.shift();
              shared_game_data.player2.guessQueue.push(k);
            } else {
              clearInterval(clientBufferInterval);
              clientBufferIntervalRunning = false;
            }
          }, 500);
        }
        if (keyCode === ENTER) {
          result = sessionComputle.guess();
          let isVisible = goAgain.elt.style.display !== "none";
          if (isVisible) {
            newcomputle();
            shared_game_data.player2 = { 
              phrase: sessionComputle.phrase, 
              topic: sessionComputle.topic, 
              guessQueue: [], 
              score: userdata.score, 
              streak: answerStreak 
            };
          }
          if (result === true) {
            goAgain.show();
          }
        }
        if (keyCode >= 65 && keyCode <= 90) {
          let inputLetter = String.fromCharCode(keyCode);
          sessionComputle.inputLetter(inputLetter);
        }
        if (keyCode >= 48 && keyCode <= 57) {
          let inputLetter = String.fromCharCode(keyCode);
          sessionComputle.inputLetter(inputLetter);
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