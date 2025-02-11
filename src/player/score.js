function submitScore(score, completed) {
  fetch('https://computle-backend.vercel.app/api/verifyscore?score=' + score + '&completed=' + completed, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server response:', data);
    if(data.message == 'valid'){
      const sessionScore = data.score
      console.log("score updated",sessionScore)
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

let sessionScore = 0;
let answerStreak = 0;

function getScore(){
  fetch('https://computle-backend.vercel.app/api/getScore', {
    method: 'GET',
    credentials: 'same-origin', // Include the session cookie with the request (same-origin for same-domain requests)
  })
  .then(response => response.json())
  .then(data => {
    if (data.score !== undefined) {
      sessionScore = data.score; // Update sessionScore with the score from the server
      console.log("Current score:", sessionScore);
      document.getElementById('score-display').innerText = `Your score is: ${sessionScore}`; // Update the UI
    }
  })
  .catch(error => {
    console.error('Error fetching score:', error);
  });
}

getScore()


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