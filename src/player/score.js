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

function getScore(){
  fetch('https://computle-backend.vercel.app/api/getScore', {
    method: 'GET',
    // credentials: 'include'  // Ensures that cookies are sent with the request POTENTIAL FIX
  })
  .then(response => response.json())
  .then(data => {
    if (data.score !== undefined) {
      sessionScore = data.score; // Update sessionScore with the score from the server
      console.log("Current score:", sessionScore);
      document.getElementById('score-display').innerText = `Your score is: ${sessionScore}`; // Update the UI
    } else {
      console.error('Score not found in session.');
    }
  })
  .catch(error => {
    console.error('Error fetching score:', error);
  });
}


setInterval(getScore, 5000);

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