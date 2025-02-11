let csWordle;
let goAgain;
let resetButton;
let complete = false;
let mode = 1;

function preload(){
  subjectsDB = loadJSON("src/Database/Subjects.json", (data) => {
    subjectsDB = data; // assign as array
  });
  
}
function setup() {
  createCanvas(600, 800);
  goAgain = createCustomButton("Go Again",200,450,"green")
  goAgain.hide()
  
  resetButton = createCustomButton("Reset Button",180,450,"green")
  resetButton.hide()

  drawHomeScreen(getSubjects())
}

function draw() {
  if(mode ==1){
    //run on home screen
  }else{
    background(220);
    csWordle.draw()
    goAgain.mousePressed(newWordle)
    resetButton.mousePressed(resetProgram)
    if(complete==true){
      completePopUp()
    }
    displayScore()
  }
  
}

//PLAN
  // PICK A TOPIC 
    // PICK A TERM

//REPEAT


function keyPressed(){
  if(keyCode == ENTER){
    //do guess
    result = csWordle.guess()
    if(result == true){
      goAgain.show()
    }
  }
  if(keyCode == BACKSPACE){
    csWordle.removeLetter()
  }
  if(keyCode >=65 && keyCode <=90){
    let inputLetter = String.fromCharCode(keyCode)
    // console.log("input letter",inputLetter)
    csWordle.inputLetter(inputLetter)
  }
  
}

function newWordle(){
  console.log("new wordle generated")
  let wordle_data = selectPhrase(currentSubjectData)
  // csWordle = new Wordle("HTML")
  csWordle = new Wordle(wordle_data[1],wordle_data[0])
  goAgain.hide();
}

function completePopUp(){
  push()
    fill('#00FF00')
    rect(8,320,585,110,10)
    fill(0)
    textAlign(CENTER)
    textFont("Inter")
    textStyle(BOLD)
    textSize(width/8)
    text("All Topics Done!",width/2,height/2)
    pop()
  resetButton.show()
}

function resetProgram(){
  previousPhrases = [];
  complete = false;
  resetButton.hide();
  newWordle();
  
}


