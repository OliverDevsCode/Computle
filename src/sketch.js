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







