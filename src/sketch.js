let csWordle;
let goAgain;
let resetButton;
let complete = false;

function preload(){
  dataset = loadJSON("src/DATABASE.json", (data) => {
    dataset = data; // Ensure it's assigned as an array
  });
}
function setup() {
  createCanvas(600, 800);
  let wordle_data = selectPhrase()
  csWordle = new Wordle(wordle_data[1],wordle_data[0])
  goAgain = createButton("Go Again")
  goAgain.position(200,450)
  goAgain.style("font-family","Inter")
  goAgain.style("font-size","40px")
  goAgain.style("border-radius","10px")
  goAgain.style("color","green")
  goAgain.hide()
  
  resetButton = createButton("Reset Button")
  resetButton.position(180,450)
  resetButton.style("font-family","Inter")
  resetButton.style("font-size","40px")
  resetButton.style("border-radius","10px")
  resetButton.style("color","green")
  resetButton.hide()
}

function draw() {
  background(220);
  csWordle.draw()
  goAgain.mousePressed(newWordle)
  resetButton.mousePressed(resetProgram)
  if(complete==true){
    completePopUp()
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
  let wordle_data = selectPhrase()
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