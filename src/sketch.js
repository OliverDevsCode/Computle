let sessionComputle;
let goAgain;
let resetButton;
let complete = false;
let mode = 1;
let userdata;
let hiddenInput;

let canvas;
let certificateBGs = [];

function preload(){
  subjectsDB = loadJSON("src/Database/Subjects.json", (data) => {
    subjectsDB = data; // assign as array
  });
  let certificateBG = loadImage('src/assets/Certificate.png')
  certificateBGs.push(certificateBG)
  certificateBG = loadImage('src/assets/Certificate2.png')
  certificateBGs.push(certificateBG)
  certificateBG = loadImage('src/assets/Certificate3.png')
  certificateBGs.push(certificateBG)



  
}
function setup() {
  canvas = createCanvas(600, 800);
  canvas.style('border', '4px solid black')
  canvas.style("border-radius","10px")
  centreCanvas()
  goAgain = createCustomButton("Go Again",200,450,"green")
  goAgain.hide()
  resetButton = createCustomButton("Reset Button",180,450,"green")
  resetButton.hide()

  drawHomeScreen(getSubjects())

  createUser()

  //mobile UI
  hiddenInput = createInput();
  hiddenInput.position(width/2,-1000)
}

function centreCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function draw() {
  if(mode == 1){
    //start screen idle mode
  }else if (mode ==-1){
    drawMenu(userdata)
    mode == 1
  }else if(mode == 2){
    //change subject idle
  }else if(mode ==3){
    // change leaderboard idle
  }else if(mode ==4){
    // verify leaderboard idle
  }else{
    background(canvasColour);
    sessionComputle.draw()
    goAgain.mousePressed(newcomputle)
    resetButton.mousePressed(resetProgram)
    if(complete==true){
      completePopUp()
    }
    displayScore()
  }
  detectDevTools();
  
}

//PLAN
  // PICK A TOPIC 
    // PICK A TERM

//REPEAT


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
  
}

//Mobile UI

function touchStarted(){
  hiddenInput.elt.focus();
}

function newcomputle(){
  console.log("new Computle generated")
  let computle_data = selectPhrase(currentSubjectData)
  // sessionComputle = new Computle("HTML")
  sessionComputle = new Computle(computle_data[1],computle_data[0])
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
  userdata.addScore(0)
  previousPhrases = [];
  complete = false;
  resetButton.hide();
  newcomputle();
  
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


