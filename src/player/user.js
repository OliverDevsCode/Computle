async function getUsername() {
  try {
    const response = await fetch('https://computle-backend.vercel.app/api/getUsername', {
      method: 'GET',
    });
    const data = await response.json();
    console.log('Server response:', data);
    return [data.username, data.hash]; 
  } catch (error) {
    console.error('Error fetching username:', error);
    return ['Guest', ''];
  }
}

async function getMSUsername(username) {
  try {
    const response = await fetch('https://computle-backend.vercel.app/api/getMSUsername', {
      method: 'post',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({username: username})      
    });
    const data = await response.json();
    console.log('Server response:', data);
    return data.hash 
  } catch (error) {
    console.error('Error fetching username:', error);
    return ['Guest', ''];
  }
}

function getFirstNameAndInitial(fullName) {
  const parts = fullName.split(" ");
  
  if (parts.length >= 2) {
    const firstName = parts[0];
    const lastInitial = parts[1].charAt(0);
    return `${firstName} ${lastInitial}.`;
  } else {
    return "Please provide a full name with at least two parts.";
  }
}

  
  async function createUser(){
    userdata = new User();
    await userdata.init();
    // console.log('User created with username:', userdata.username);
  }
  
  
  class User{
    #username;
    #usernameHASH;
    #score;
    #streak;
    #curentSubject;
    #hashScore;
    #leaderboardID;  
    #leaderboardScore;
    constructor(){
      this.#score = 0
      this.#streak = 0
    }
  
    async init(){
      const usernameData = await getUsername();
      this.#username = usernameData[0]
      this.#usernameHASH = usernameData[1]
      if(localStorage.getItem("msal_userName") != null){
        //getHash
        console.log(localStorage.getItem("msal_userName"))
        let msal_Username = localStorage.getItem("msal_userName")
        this.#username = getFirstNameAndInitial(msal_Username)
        console.log(localStorage.getItem("msal_accountId"))
        this.#usernameHASH = await getMSUsername(localStorage.getItem("msal_accountId"))
      }
      
      return this;
    }
  
    addScore(val){
      this.#score = val
    }
  
    addStreak(val){
      this.#streak += val
    }

    setHashScore(val){
      this.#hashScore = val
    }

    get usernameHASH(){
      return this.#usernameHASH;
    }

    get leaderboardID(){
      return this.#leaderboardID
    }

    get username(){
      return this.#username
    }

    get score(){
      return this.#score
    }

    get subject(){
      return this.#curentSubject
    }

    get leaderboardScore(){
      return this.#leaderboardScore
    }

    setLeaderboardID(str){
      this.#leaderboardID = str
    }

    async exportUser(){
      console.log("starting export")
      //get score from leaderboard
      const leaderboard_data = await verifyLeaderBoardID(this.#leaderboardID,this.#username);
      this.#leaderboardScore = leaderboard_data.score
      let certificate = createGraphics(2000, 1414);
      let txtArr = [this.#username,this.#leaderboardID];
      saveStrings(txtArr, "Leaderboard Entry",'txt',false);
      if(this.#leaderboardScore >= 30){
        certificate.image(certificateBGs[2], 0, 0); 
        certificate.textSize(70); 
        certificate.textFont('serif')
        certificate.fill(0); 
        certificate.textAlign(CENTER, CENTER); 
        certificate.text(`${this.#username}`, certificate.width / 2,certificate.height / 2.35); 
        certificate.textSize(40);
        certificate.textStyle(NORMAL)
        if(this.#leaderboardScore == 1){
          certificate.text(`${this.#username} acheived a score of ${this.#leaderboardScore} point on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.9); // Centered text
        }else{
        certificate.text(`${this.#username} acheived a score of ${this.#leaderboardScore} points on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.9); // Centered text
        }
        certificate.text(`Leaderboard ID: ${this.#leaderboardID}`, certificate.width / 2, certificate.height /1.7);
                    
        save(certificate, `Score EXPORT ${this.#username}.png`);// Save the image
      }
      else if(this.#leaderboardScore >= 15){
        certificate.image(certificateBGs[1], 0, 0); 
        certificate.textSize(70); 
        certificate.textFont('Josefin Sans')
        certificate.fill(0); 
        certificate.textAlign(CENTER, CENTER); 
        certificate.text(`${this.#username}`, certificate.width / 2,certificate.height / 2.25); 
        certificate.textSize(50);
        certificate.textStyle(NORMAL)
        if(this.#leaderboardScore == 1){
          certificate.text(`${this.#username} acheived a score of ${this.#leaderboardScore} point on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.75); // Centered text
        }else{
        certificate.text(`${this.#username} acheived a score of ${this.#leaderboardScore} points on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.75); // Centered text
        }
        certificate.text(`Leaderboard ID: ${this.#leaderboardID}`, certificate.width / 2, certificate.height /1.3);
                    
        save(certificate, `Score EXPORT ${this.#username}.png`);// Save the image
      }
      else if(this.#leaderboardScore < 15){
        certificate.image(certificateBGs[0], 0, 0); 
        certificate.textSize(70); 
        certificate.textFont('Josefin Sans')
        certificate.fill(0); 
        certificate.textAlign(CENTER, CENTER); 
        certificate.text(`${this.#username}`, certificate.width / 2,certificate.height / 2.25); 
        certificate.textSize(50);
        certificate.textStyle(NORMAL)
        if(this.#leaderboardScore == 1){
          certificate.text(`${this.#username} acheived a score of ${this.#leaderboardScore} point on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.75); // Centered text
        }else{
        certificate.text(`${this.#username} acheived a score of ${this.#leaderboardScore} points on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.75); // Centered text
        }
        certificate.text(`Leaderboard ID: ${this.#leaderboardID}`, certificate.width / 2, certificate.height /1.3);
                    
        save(certificate, `Score EXPORT ${this.#username}.png`);// Save the image
      }
  
      
    
    }
    set currentSubject(str){
      this.#curentSubject = str
      this.#score = 0
    }
  
    get score(){
      return this.#score
    }
  
    get username(){
      return this.#username
    }

    get currentSubject(){
      return this.#curentSubject
    }

    get hashValue(){
      return this.#hashScore
    }

    get leaderboardID(){
      return this.#leaderboardID
    }
    
  
  }
