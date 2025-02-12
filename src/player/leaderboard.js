function getLeaderboard(){
    fetch('https://computle-backend.vercel.app/api/leaderboard', {
      method: 'GET',
      // credentials: 'include'  // Ensures that cookies are sent with the request POTENTIAL FIX
    })
    .then(response => response.json())
    .then(data => {
      if (data !== undefined) {
        const leaderboard = data; // Update leaderboard with the score from the server
        console.log("Leaderboard:", leaderboard);
      } else {
        console.error('No leaderboard');
      }
    })
    .catch(error => {
      console.error('Error fetching score:', error);
    });
  }