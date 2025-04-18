let menuButton;
let leaderBoardButton;
let changeSubject;
let returnButton;
let submitScoreButton;
let exportButton;
let validateButton;
let usernameINPUT;
let leaderIdINPUT;
let submitButton;
let multiplayerButton;
let joinButton;
let createPartyButton;
function createMenu(x,y){
  menuButton = createButton("☰")
  let xOFFSET = (windowWidth - width) / 2;
  let yOFFSET = (windowHeight - height) / 2;
  menuButton.position(x+xOFFSET,y+yOFFSET)
  menuButton.mousePressed(openMenu)
  //general menu
  multiplayerButton = createCustomButton('Multiplayer',20,height/30,'#60779e')
  leaderBoardButton = createCustomButton('View Leaderboard',125,height/2,'#00FF00')
  changeSubject = createCustomButton('Change Subject',140,height/1.70,'#60779e')
  returnButton = createCustomButton('Return',230,height/1.5,'#887986')
  submitScoreButton = createCustomButton('Submit Score',160,height/1.2,'#00FF00')
  exportButton = createCustomButton("Export Score",170,height/1.25,'#60779e')
  //verification screen
  validateButton = createCustomButton("Validate Previous Score",72,height/1.1,'#FFA500')
  submitButton = createCustomButton("Submit Details",160,height/1.5,'#00FF00')
  usernameINPUT = createCustomInput(35,height/2.5)
  leaderIdINPUT = createCustomInput(35,height/1.8)
  //multiplayer screen
  createPartyButton = createCustomButton("Create Game",170,height/2.5,'#00FF00')
  joinButton = createCustomButton("Join Game",190,height/1.3,'#60779e')
  partyInput = createCustomInput(35,height/1.5)

  joinButton.hide()
  multiplayerButton.hide()
  createPartyButton.hide()
  partyInput.hide()
  usernameINPUT.hide()
  leaderIdINPUT.hide()
  validateButton.hide()
  leaderBoardButton.hide()
  returnButton.hide()
  changeSubject.hide()
  submitScoreButton.hide()
  exportButton.hide()
  submitButton.hide()
  
}

function openMenu(){
  if(mode ==! -1){
    mode = -1
  }
  if(mode == 3){
    mode = -1
  }
  if(mode ==2){
    alert("Please Change Subject")
  }
  if(mode == 4){
    closeMenu()
    mode = -1
  }
  if(mode == 5){
    closeMenu()
    mode = -1
    drawMenu(userdata)
    resizeCanvas(600, 800);
    centreCanvas()
    let xOFFSET = (windowWidth - width) / 2;
    let yOFFSET = (windowHeight - height) / 2;
    let x = width-40
    menuButton.position(x+xOFFSET,10+yOFFSET)
  }
  console.log("menu pressed")
}

function drawMenu(user){
  goAgain.hide()
  resetButton.hide()
  multiplayerButton.show()
  leaderBoardButton.show()
  returnButton.show()
  changeSubject.show()
  exportButton.show()
  submitScoreButton.hide()
  validateButton.show()
  background(canvasColour)
  // line(width/2,0,width/2,height) // for position debugging
  push()
  textAlign(CENTER)
  textFont("Inter")
  textStyle(BOLD)
  textSize(width/20)
  text("Computle Menu",width/2,height/5);
  textSize(width/25)
  text(`Session Username: ${user.username}`,width/2,height/5 +100);
  text(`Session Score: ${user.score}`,width/2,height/5 +150);
  pop()

  multiplayerButton.mousePressed(multiplayerMenu)
  leaderBoardButton.mousePressed(displayLeaderBoard)
  changeSubject.mousePressed(changeSubjectMenu)
  returnButton.mousePressed(closeMenu)
  exportButton.mousePressed(exportScore)
  validateButton.mousePressed(validatePreviousScoreMenu)
}

let alerted = false

function changeSubjectMenu(){
    if(alerted == false){
      alert("Changing Subject Will Reset Score")
      alerted = true
    }else{
      closeMenu()
      goAgain.hide()
      mode = 2
      let subjects = getSubjects();
      background(canvasColour);
      //create a dropdown menu
      let subjectSelect = createDropDown(subjects,width/6,height/1.5,300,50)
      let enterButton = createCustomButton("SELECT",width/6 + 320,height/1.5,"#00FF00")
      push()
      if(canvasColour != '#7DA6DE'){
        stroke(255,255,255)
        strokeWeight(4);
        fill(0)
        lightmodeLogo.resize(499,176)
        image(lightmodeLogo,51,height/10)
    }else{
        stroke(0)
        strokeWeight(4);
        fill(255,255,255)
        darkmodeLogo.resize(499,176)
        image(darkmodeLogo,51,height/10)
    }
      textAlign(CENTER)
      textFont("Inter")
      textStyle(BOLD)
      textSize(width/20)
      text("Select A Topic Below",width/2,height/1.7)
      pop()
  
      enterButton.mousePressed(() => startcomputle(subjectSelect,enterButton,subjects));
      alerted = false
    }
    
}

function closeMenu(){
 multiplayerButton.hide()
 leaderBoardButton.hide()
 changeSubject.hide()
 returnButton.hide()
 submitScoreButton.hide()
 exportButton.hide()
 validateButton.hide()
 usernameINPUT.hide()
 leaderIdINPUT.hide()
 submitButton.hide()
 joinButton.hide()
 partyInput.hide()
 createPartyButton.hide()
 mode = 0
if(sessionComputle.solved == true){
  goAgain.show()
}
}

function exportScore(){
  if(userdata.leaderboardID == undefined){
    alert("Please submit score to leaderboard first!")
  }else{
    closeMenu()
    userdata.exportUser()
    alert("If score on certificate does not match please submit score to leaderboard again");
  }
  
}

function validatePreviousScoreMenu(){
  closeMenu()
  goAgain.hide()
  mode = 4
  background(canvasColour)
  push()
  textAlign(CENTER)
  textFont("Inter")
  textStyle(BOLD)
  textSize(25)
  text("Welcome to Leaderboard Verification",width/2,80)
  textSize(20)
  textWrap(WORD)
  text("To verify if a score is on the leaderboard please enter the following:",0,200,600)
  text("Username",width/2,(height/2.5)-30)
  text("Leaderboard ID",width/2,(height/1.8)-30)
  pop()
  usernameINPUT.show()
  leaderIdINPUT.show()
  submitButton.show()
  submitButton.mousePressed(getVerificationResult)
}

async function getVerificationResult(){
 validatePreviousScoreMenu()
 const username = usernameINPUT.value()
 const ID = leaderIdINPUT.value()
 const result = await verifyLeaderBoardID(ID,username);
 if(result == null){
  console.log("error fetching verification")
  alert("Error Fetching Verification")
 }else{
  push()
  textSize(25)
  textFont("Inter")
  textAlign(CENTER)
  textStyle(BOLD)
  textSize(25)
  text(`${result.message}`,width/2,height/1.25)
  text(`Score: ${result.score}`,width/2,height/1.15)
  pop()
 }
 
}