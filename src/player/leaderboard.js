function getLeaderboard(){
    return fetch('https://computle-backend.vercel.app/api/leaderboard', {
      method: 'GET',
      // credentials: 'include'  // Ensures that cookies are sent with the request POTENTIAL FIX
    })
    .then(response => response.json())
    .then(data => {
      if (data !== undefined) {
        const leaderboard = data; // Update leaderboard with the score from the server
        // console.log("Leaderboard:", leaderboard);
        return leaderboard
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
    mode = 3;
    background(canvasColour);
    text(`You: ${userdata.username} ${userdata.score} points`,width/2,600)
    try {
      // Wait until getLeaderboard resolves
      let boardData = (await getLeaderboard()).data;
      // console.log(boardData);

      boardData.sort(function(a, b){return b.score - a.score})
  
      numEntries = boardData.length
      console.log(numEntries)
      if(numEntries > 10){
        for(let i =0; i < 15;i ++){
          text(boardData[i].score + ' points',80,100+(i*30))
          text(boardData[i].username,width/2,100+(i*30))
        }
      }else{
        for(let i = 0; i < numEntries; i ++){
          text(boardData[i].score + ' points',80,100+(i*30))
          text(boardData[i].username,width/2,100+(i*30))
          push()
          textSize(12)
          text(boardData[i].subject,width-80,100+(i*30))
          pop()
        }
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
    await sendScore(userdata.score,userdata.username,userdata.currentSubject,userdata.hashValue)
    await displayLeaderBoard()
  }
  