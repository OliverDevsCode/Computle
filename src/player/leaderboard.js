async function getLeaderboard(){
  return fetch('https://computle-backend.vercel.app/api/leaderboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
    // credentials: 'include'  // Ensures that cookies are sent with the request POTENTIAL FIX
  })
  .then(response => response.json())
  .then(data => {
    if (data !== undefined) {
      const leaderboard = data; // Update leaderboard with the score from the server
      // console.log("Leaderboard:", leaderboard);
      return leaderboard;
    } else {
      console.error('No leaderboard');
    }
  })
  .catch(error => {
    console.error('Error fetching score:', error);
  });
}
  

  async function displayLeaderBoard() {
    push()
    textAlign(CENTER)
    textSize(20)
    textFont("Inter")
    textStyle(NORMAL)
    closeMenu();
    goAgain.hide()
    mode = 3;
    background(canvasColour);
    text(`You: ${userdata.username} ${userdata.score} points`,width/2,600)
    try {
      // Wait until getLeaderboard resolves
      let boardData = (await getLeaderboard()).data;
      // console.log(boardData);

      // boardData.sort(function(a, b){return b.score - a.score})
  
      numEntries = boardData.length
      
      for(let i = 0; i < numEntries; i ++){
          push()
          if(localStorage.getItem("msal_userName") != null){
            if(boardData[i].username == userdata.username && boardData[i].msHASH == userdata.usernameHASH && boardData[i].subject == userdata.subject){
              stroke(255,255,255);
              strokeWeight(4);
              fill(0,255,0)
            }
            else{
            fill(0,0,0)
            }
          }else{
            if(boardData[i].username == userdata.username && boardData[i].subject == userdata.subject){
              stroke(255,255,255);
              strokeWeight(4);
              fill(0,255,0)
            }else{
              fill(0,0,0)
            }
          }
          
          text(boardData[i].score + ' points',80,100+(i*30))
          text(boardData[i].username,width/2,100+(i*30))
          push()
          textSize(10)
          text(boardData[i].subject,width-80,100+(i*30))
          pop()
          pop()
        }
      
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
    textSize(40)
    textStyle(BOLD)
    text("Leaderboard",width/2,50)
    pop()
    submitScoreButton.show()
    submitScoreButton.mousePressed(updateLeaderboard)

  }

  async function updateLeaderboard(){
    if(userdata.score == 0){
      alert("Please Complete a Computle First")
    }else{
      if(localStorage.getItem("msal_userName") != null){
        let MSusername = localStorage.getItem("msal_accountId")
        sendScoreNDE(userdata.score)
        await sendScore(userdata.score,userdata.username,userdata.currentSubject,userdata.hashValue,userdata.usernameHASH,MSusername)
      }else{
        await sendScore(userdata.score,userdata.username,userdata.currentSubject,userdata.hashValue,userdata.usernameHASH)
      }
      await displayLeaderBoard()
    }
    
  }

  async function verifyLeaderBoardID(leaderboardID, username) {
    try {
      const response = await fetch('https://computle-backend.vercel.app/api/verifyLeaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ leaderboardID, username })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null; // Return null or some error object
    }
  }

  //Mr Dennehy integration 
  function sendScoreNDE(score) {
    // Retrieve player name from "user-info" element; if not found, fallback to localStorage.
    let playerName = localStorage.getItem("msal_userName")

    
    if (playerName) {
      // Submit the score to the database.
      fetch(`https://cs-exam-game-v5.vercel.app/api/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: playerName,
          score: score,
          scoreSource: "Computle"
        })
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.error || "Unknown error"); });
        }
        return response.json();
      })
      .then(data => {
        alert(`Score submitted successfully! (ID: ${data.insertedId})`);
      })
      .catch(error => {
        console.error('Error submitting score:', error);
        alert("Score submission failed: " + error.message);
      });
    } else {
      alert("No user info available; score not submitted.");
    }
  }
  
  