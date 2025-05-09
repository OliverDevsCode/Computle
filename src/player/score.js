//session variables
let answerStreak = 0;

function submitScore(score, completed) {
  console.log("submit called")
  fetch('https://computle-backend.vercel.app/api/verifyscore?score=' + score + '&completed=' + completed, {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server response:', data);
    if(data.message == 'valid'){
      userdata.addScore(data.score)
      userdata.setHashScore(data.hashValue)
      console.log("Current score:", userdata.score);
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


// setInterval(getScore, 5000);



function displayScore(){
  push()
  fill(0)
  textAlign(CENTER)
  textFont("Inter")
  textStyle(BOLD)
  textSize(25)
  if(answerStreak>0){
    // text(`Score: ${userdata.score+(Math.floor(answerStreak*0.5))}`,width/2,height-10) might be added 
    text(`Score: ${userdata.score}`,600/2,height-10)
  }else{
    text(`Score: ${userdata.score}`,600/2,height-10)
  }
  pop()
}

async function sendScore(score,username,subject,hash,usernameHASH,MSusername){
  userdata.addScore(0)//reset to prevent double click exploit 
  return fetch('https://computle-backend.vercel.app/api/enterScore',{
    method: 'post',
    headers: {
      'Content-type':'application/json'
    },
    body: JSON.stringify({score:score, username: username, subject: subject, hash: hash, usernameHASH: usernameHASH, MSusername:MSusername})      
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.leaderboardID);
    if(data.leaderboardID != undefined){
      userdata.setLeaderboardID(data.leaderboardID);
      userdata.addScore(0)//reset score
    }
  })
  .then(error => {
    if(error!= undefined){
      console.log('Error:',error)
      alert("Error Sending Score Please Try again")
      userdata.addScore(score)//reset score if fail
    }
    })
}


