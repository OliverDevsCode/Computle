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
    constructor(){
      this.#score = 0
      this.#streak = 0
    }
  
    async init(){
      const usernameData = await getUsername();
      if(localStorage.getItem("msal_userName") != null){
        //getHash
        console.log("fetching hash")
      }
      this.#username = usernameData[0]
      this.#usernameHASH = usernameData[1]
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

    setLeaderboardID(str){
      this.#leaderboardID = str
    }

    exportUser(){
      console.log("starting export")
      let certificate = createGraphics(2000, 1414);
      let txtArr = [this.#username,this.#leaderboardID];
      saveStrings(txtArr, "Leaderboard Entry",'txt',false);
      if(this.#score >= 30){
        certificate.image(certificateBGs[2], 0, 0); 
        certificate.textSize(70); 
        certificate.textFont('serif')
        certificate.fill(0); 
        certificate.textAlign(CENTER, CENTER); 
        certificate.text(`${this.#username}`, certificate.width / 2,certificate.height / 2.35); 
        certificate.textSize(40);
        certificate.textStyle(NORMAL)
        if(this.#score == 1){
          certificate.text(`${this.#username} acheived a score of ${this.#score} point on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.9); // Centered text
        }else{
        certificate.text(`${this.#username} acheived a score of ${this.#score} points on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.9); // Centered text
        }
        certificate.text(`Leaderboard ID: ${this.#leaderboardID}`, certificate.width / 2, certificate.height /1.7);
                    
        save(certificate, `Score EXPORT ${this.#username}.png`);// Save the image
      }
      else if(this.#score >= 15){
        certificate.image(certificateBGs[1], 0, 0); 
        certificate.textSize(70); 
        certificate.textFont('Josefin Sans')
        certificate.fill(0); 
        certificate.textAlign(CENTER, CENTER); 
        certificate.text(`${this.#username}`, certificate.width / 2,certificate.height / 2.25); 
        certificate.textSize(50);
        certificate.textStyle(NORMAL)
        if(this.#score == 1){
          certificate.text(`${this.#username} acheived a score of ${this.#score} point on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.75); // Centered text
        }else{
        certificate.text(`${this.#username} acheived a score of ${this.#score} points on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.75); // Centered text
        }
        certificate.text(`Leaderboard ID: ${this.#leaderboardID}`, certificate.width / 2, certificate.height /1.3);
                    
        save(certificate, `Score EXPORT ${this.#username}.png`);// Save the image
      }
      else if(this.#score < 15){
        certificate.image(certificateBGs[0], 0, 0); 
        certificate.textSize(70); 
        certificate.textFont('Josefin Sans')
        certificate.fill(0); 
        certificate.textAlign(CENTER, CENTER); 
        certificate.text(`${this.#username}`, certificate.width / 2,certificate.height / 2.25); 
        certificate.textSize(50);
        certificate.textStyle(NORMAL)
        if(this.#score == 1){
          certificate.text(`${this.#username} acheived a score of ${this.#score} point on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.75); // Centered text
        }else{
        certificate.text(`${this.#username} acheived a score of ${this.#score} points on ${this.#curentSubject}`, certificate.width / 2,       certificate.height / 1.75); // Centered text
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
