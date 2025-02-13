let menuButton;
let leaderBoardButton;
let changeSubject;
let returnButton;
let submitScoreButton;
let exportButton;
function createMenu(x,y){
  menuButton = createButton("☰")
  let xOFFSET = (windowWidth - width) / 2;
  let yOFFSET = (windowHeight - height) / 2;
  menuButton.position(x+xOFFSET,y+yOFFSET)
  menuButton.mousePressed(openMenu)
  leaderBoardButton = createCustomButton('View Leaderboard',125,height/2,'#00FF00')
  changeSubject = createCustomButton('Change Subject',140,height/1.70,'#60779e')
  returnButton = createCustomButton('Return',230,height/1.5,'#887986')
  submitScoreButton = createCustomButton('Submit Score',160,height/1.2,'#00FF00')
  exportButton = createCustomButton("Export Score",170,height/1.25,'#60779e')
  leaderBoardButton.hide()
  returnButton.hide()
  changeSubject.hide()
  submitScoreButton.hide()
  exportButton.hide()
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
  console.log("menu pressed")
}

function drawMenu(user){
  goAgain.hide()
  leaderBoardButton.show()
  returnButton.show()
  changeSubject.show()
  exportButton.show()
  submitScoreButton.hide()
  background(canvasColour)
  push()
  // line(width/2,0,width/2,height) // for position debugging
  textAlign(CENTER)
  textFont("Inter")
  textStyle(BOLD)
  textSize(width/20)
  text("Computle Menu",width/2,height/5);
  textSize(width/25)
  text(`Session Username: ${user.username}`,width/2,height/5 +100);
  text(`Session Score: ${user.score}`,width/2,height/5 +150);
  pop()

  leaderBoardButton.mousePressed(displayLeaderBoard)
  changeSubject.mousePressed(changeSubjectMenu)
  returnButton.mousePressed(closeMenu)
  exportButton.mousePressed(exportScore)
}

function changeSubjectMenu(){
    closeMenu()
    mode = 2
    let subjects = getSubjects();
    background(canvasColour);
    //create a dropdown menu
    let subjectSelect = createDropDown(subjects,width/6,height/1.5,300,50)
    let enterButton = createCustomButton("SELECT",width/6 + 320,height/1.5,"#00FF00")
    push()
    fill(255,0,255)
    textAlign(CENTER)
    textFont("Inter")
    textStyle(BOLD)
    textSize(width/15)
    text("Welcome To Computle!",width/2,height/4)
    textSize(width/20)
    text("Select A Topic Below",width/2,height/2)
    pop()

    enterButton.mousePressed(() => startcomputle(subjectSelect,enterButton,subjects));
}

function closeMenu(){
 leaderBoardButton.hide()
 changeSubject.hide()
 returnButton.hide()
 submitScoreButton.hide()
 exportButton.hide()
 mode = 0
}

function exportScore(){
  closeMenu()
  userdata.exportUser()
}