let menuButton;
let leaderBoardButton;
let changeSubject;
let returnButton;
let submitScoreButton;
function createMenu(x,y){
  menuButton = createButton("☰")
  menuButton.position(x,y)
  menuButton.mousePressed(openMenu)
  leaderBoardButton = createCustomButton('View Leaderboard',125,height/2,'#00FF00')
  changeSubject = createCustomButton('Change Subject',140,height/1.70,'#60779e')
  returnButton = createCustomButton('Return',230,height/1.5,'#887986')
  submitScoreButton = createCustomButton('Submit Score',160,height/1.2,'#00FF00')
  leaderBoardButton.hide()
  returnButton.hide()
  changeSubject.hide()
  submitScoreButton.hide()
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
  submitScoreButton.hide()
  background(220)
  push()
  // line(width/2,0,width/2,height) // for position debugging
  textAlign(CENTER)
  textFont("Inter")
  textStyle(BOLD)
  textSize(width/20)
  text("Comptule Menu",width/2,height/5);
  textSize(width/25)
  text(`Session Username: ${user.username}`,width/2,height/5 +100);
  text(`Session Score: ${user.score}`,width/2,height/5 +150);
  pop()

  leaderBoardButton.mousePressed(displayLeaderBoard)
  changeSubject.mousePressed(changeSubjectMenu)
  returnButton.mousePressed(closeMenu)
}

function changeSubjectMenu(){
    closeMenu()
    mode = 2
    let subjects = getSubjects();
    background(220);
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

    enterButton.mousePressed(() => startWordle(subjectSelect,enterButton,subjects));
}

function closeMenu(){
 leaderBoardButton.hide()
 changeSubject.hide()
 returnButton.hide()
 submitScoreButton.hide()
 mode = 0
}