function submitScore(score, completed) {
  fetch('https://computle-backend.vercel.app/api/verifyscore?score=' + score + '&completed=' + completed, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server response:', data);
    if(data.message == 'valid'){
      sessionScore = data.score
      console.log("score updated",sessionScore)
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

let sessionScore = 0;
let answerStreak = 0;

function displayScore(){
  push()
  fill(0)
  textAlign(CENTER)
  textFont("Inter")
  textStyle(BOLD)
  textSize(25)
  if(answerStreak>0){
    text(`Score: ${sessionScore+(Math.floor(answerStreak*0.5))}`,width/2,height-10)
  }else{
    text(`Score: ${sessionScore}`,width/2,height-10)
  }
  console.log("answer streak",answerStreak)
  pop()
}