function newcomputle(){
  console.log("new Computle generated")
  let computle_data = selectPhrase(currentSubjectData)
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
