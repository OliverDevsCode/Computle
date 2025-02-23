let shared_game_data;
let isHost = false;
let multiplayerMode = false;
let multiplayerStarted = false;
let clientID;
let opponentComputle;
let ExperimentalWarning = false

function startMultiplayer() {
  multiplayerMode = true;
  isHost = true
  let partyCode = Math.round(Math.random() * 1000);
  
  // Connect using a callback for when the connection is ready.
  partyConnect("wss://demoserver.p5party.org", `computle${partyCode}`,'main', () => {
    console.log("Connected as host");
    
    // Load shared object with default values.
    shared_game_data = partyLoadShared('main',"shared_game_data",(shared) => {
      console.log("Shared data is now ready!", shared);
      shared_game_data = shared;
      // Start watching the shared object for changes.
      partySetShared( shared, { 
        player1: { 
          phrase: sessionComputle.phrase,
          topic: sessionComputle.topic,
          guessQueue: [],
          score: userdata.score,
          streak: answerStreak
        },
        player2: { 
          phrase: null,
          topic: null,
          guessQueue: [],
          score: null,
          streak: null 
        }
      });      
      
    });

    setTimeout(() => {
  partyWatchShared(shared_game_data, startMultiplayerGame, true);
}, 2000);


  });
  
  return partyCode;  
}

function joinMultiplayer(partyCode) {
  multiplayerMode = true;
  
  // Connect using the provided partyCode.
  partyConnect("wss://demoserver.p5party.org", `computle${partyCode}`,'main', () => {
    console.log("Connected as client");
    
    // Load the shared object without providing defaults so we don't overwrite player1.
    shared_game_data = partyLoadShared('main',"shared_game_data",(shared) => {
      console.log("Shared data is now ready!", shared);
      shared_game_data = shared;

      // Watch for changes.
      
      // Ensure player1 exists (if not, initialize it).
      if (!shared_game_data.player1) {
        shared_game_data.player1 = { 
          phrase: null, 
          topic: null, 
          guessQueue: [], 
          score: null, 
          streak: null 
        };
      }
      
      // Update player2 data.
      shared_game_data.player2 = { 
        phrase: sessionComputle.phrase, 
        topic: sessionComputle.topic, 
        guessQueue: [], 
        score: userdata.score, 
        streak: answerStreak 
      };
      
      
    });

    setTimeout(() => {
      partyWatchShared(shared_game_data, startMultiplayerGame, true);
    }, 2000);

  });
}

function multiplayerMenu() {

  if(ExperimentalWarning == false){
    showMultiplayerWarning()
    ExperimentalWarning = true
  }else{
    multiplayerStarted = false;

    opponentComputle = undefined;
    
    push();
    closeMenu();
    
    joinButton.show();
    createPartyButton.show();
    partyInput.show();
  
    mode = 5;
    goAgain.hide();
    background(canvasColour);
  
    textAlign(CENTER);
    textFont("Inter");
    textStyle(BOLD);
    textSize(25);
  
    text("Works On PC Landscape Only", width / 2, height / 10);
  
    let partyCode;
    createPartyButton.mousePressed(() => {
      if (multiplayerMode) {
        alert("Party Already Created! Please Refresh");
      } else {
        partyCode = startMultiplayer();
        console.log(`partyCode: ${partyCode}`);
        if (partyCode !== undefined) {
          push();
          textAlign(CENTER);
          textFont("Inter");
          textStyle(BOLD);
          textSize(25);
          text(`Party Code: ${partyCode}`, width / 2, height / 5);
          pop();
        }
      }
    });
  
    joinButton.mousePressed(() => {
      if (multiplayerMode) {
        alert("Already In Party! Please Refresh");
      } else {
        joinMultiplayer(partyInput.value());
      }
    });
    
    pop();
  }
}

function showMultiplayerWarning() {
  alert("Multiplayer is still Experimental, Warning!")
}

function processInputs(player) {
  if (player.guessQueue.length > 0) {
    for (let i = 0; i < player.guessQueue.length; i++) {
      let key = player.guessQueue[i];
      
      if (key === ENTER) {
        opponentComputle.guess();
        if (opponentComputle.solved) {
          opponentComputle = new MultiplayerComputle(
            player.phrase.join(""), player.topic, width / 2
          );
        }
      } else if (key === BACKSPACE) {
        opponentComputle.removeLetter();
      } else if ((key >= 65 && key <= 90) || (key >= 48 && key <= 57)) {
        let inputLetter = String.fromCharCode(key);
        opponentComputle.inputLetter(inputLetter);
      }
    }
    player.guessQueue = []; // Clear processed inputs
  }
}




function startMultiplayerGame() {
  // Use a proper comparison (===) instead of an assignment.
  if(shared_game_data.player2.topic == undefined){
    console.log("Not Starting")
  }else{
    console.log("Starting Now")
    if (multiplayerStarted === false) {
      console.log("Starting Multiplayer Game");
      closeMenu();
      mode = 5;
      resizeCanvas(1200, 800);
      let yOFFSET = (windowHeight - height) / 2;
      let xOFFSET = (windowWidth - width) / 2;
      menuButton.position(xOFFSET+1150,yOFFSET+10)
      centreCanvas()
      multiplayerStarted = true;
      console.log(shared_game_data.player2.phrase)
      if(isHost === true){
        console.log("phrase",(shared_game_data.player2.phrase).join(""))
        opponentComputle = new MultiplayerComputle((shared_game_data.player2.phrase).join(""),shared_game_data.player2.topic,width/2)
      }else{
        opponentComputle = new MultiplayerComputle((shared_game_data.player1.phrase).join(""),shared_game_data.player1.topic,width/2)
      }
    }
    console.log("UPDATED")
    console.log(`Player1 ${JSON.stringify(shared_game_data.player1)}`)
    console.log(`Player2 ${JSON.stringify(shared_game_data.player2)}`)
    if (isHost) {
      processInputs(shared_game_data.player2);
      if (JSON.stringify(opponentComputle.phrase) !== JSON.stringify(shared_game_data.player2.phrase)) {
        console.log("Making a new computle")
        opponentComputle = new MultiplayerComputle(
          shared_game_data.player2.phrase.join(""), shared_game_data.player2.topic, width / 2
        );
      }
    } else {
      processInputs(shared_game_data.player1);
      if (JSON.stringify(opponentComputle.phrase) !== JSON.stringify(shared_game_data.player1.phrase)) {
        console.log("Making a new computle")
        opponentComputle = new MultiplayerComputle(
          shared_game_data.player1.phrase.join(""), shared_game_data.player1.topic, width / 2
        );
      }
    }
  }
  
}
