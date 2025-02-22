let shared_game_data;
let isHost = false;
let multiplayerMode = false
let clientID;

async function startMultiplayer(){
  multiplayerMode = true
  let partyCode = Math.round(Math.random()*1000)
  await partyConnect("wss://demoserver.p5party.org", `computle${partyCode}`);
  //format 
  shared_game_data = await partyLoadShared("shared_game_data", { player1: {phrase: sessionComputle.phrase,topic:sessionComputle.topic,guessKey:null,score:userdata.score,streak:answerStreak} , player2: {phrase:null,topic:null,guessKey:null,score:null,streak:null}});


  return partyCode
}

async function joinMultiplayer(partyCode) {
  multiplayerMode = true;
  await partyConnect("wss://demoserver.p5party.org", `computle${partyCode}`);

  // Load existing shared data without overwriting player1
  shared_game_data = await partyLoadShared("shared_game_data", {});

  // If player1 already exists, keep it. Otherwise, use default data.
  if (!shared_game_data.player1) {
    shared_game_data.player1 = { phrase: null, topic: null, guessKey: null, score: null, streak: null };
  }

  // Set player2 data without changing player1
  shared_game_data.player2 = { 
    phrase: sessionComputle.phrase, 
    topic: sessionComputle.topic, 
    guessKey: null, 
    score: userdata.score, 
    streak: answerStreak 
  };
}


async function multiplayerMenu(){
  closeMenu()
  joinButton.show()
  createPartyButton.show()
  partyInput.show()

  mode = 5 
  goAgain.hide()
  background(canvasColour)

  let partyCode;
  createPartyButton.mousePressed(async ()=>{
    if(multiplayerMode == true){
      alert("Party Already Created")
    }else{
      partyCode = await startMultiplayer();
      console.log(`partyCode: ${partyCode}`)
      if(partyCode!= undefined){
        push()
        textAlign(CENTER)
        textFont("Inter")
        textStyle(BOLD)
        textSize(25)
        text(`Party Code: ${partyCode}`,width/2,height/5)
        pop()
      }
    }
  })

  joinButton.mousePressed(async ()=>{
    if(multiplayerMode == true){
      alert("Already Joined")
    }else{
      await joinMultiplayer(partyInput.value());
    }
  })
  
}


class MultiplayerComputle extends Computle{
  constructor(phrase,topic){
    super(phrase,topic)
  }

}