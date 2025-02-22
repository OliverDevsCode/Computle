let shared_game_data;
let isHost = false;
let multiplayerMode = false;
let multiplayerStarted = false;
let clientID;

function startMultiplayer() {
  multiplayerMode = true;
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
          guessKey: null,
          score: userdata.score,
          streak: answerStreak
        },
        player2: { 
          phrase: null,
          topic: null,
          guessKey: null,
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
          guessKey: null, 
          score: null, 
          streak: null 
        };
      }
      
      // Update player2 data.
      shared_game_data.player2 = { 
        phrase: sessionComputle.phrase, 
        topic: sessionComputle.topic, 
        guessKey: null, 
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
  multiplayerStarted = false;
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
      alert("Party Already Created");
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
      alert("Already Joined");
    } else {
      joinMultiplayer(partyInput.value());
    }
  });
  
  pop();
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
      resizeCanvas(1200, 900);
      multiplayerStarted = true;
    }

  }
  
}
