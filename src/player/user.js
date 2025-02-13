async function getUsername(){
    try {
      const response = await fetch('https://usernameapiv1.vercel.app/api/random-usernames?count=1');
      const data = await response.json();
      // console.log('Server response:', data);
      return data.usernames[0]; // Return the username
    } catch (error) {
      console.error('Error fetching username:', error);
      return 'Guest'; // Default fallback username
    }
  }
  
  async function createUser(){
    userdata = new User();
    await userdata.init();
    // console.log('User created with username:', userdata.username);
  }
  
  
  class User{
    #username;
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
      this.#username = await getUsername();
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

    setLeaderboardID(str){
      this.#leaderboardID = str
    }

    exportUser(){
      console.log("starting export")
      push()
      background(canvasColour);
      textAlign(CENTER)
      textFont('Inter')
      textSize(50)
      text("Certifcate of Score",width/2,height/2.5)
      textSize(25)
      text(`Username: ${this.#username}`,width/2,height/2)
      text(`Score: ${this.#score}`,width/2,height/2 + 100)
      text(`Subject: ${this.#curentSubject}`,width/2,height/2 + 150)
      const date = new Date();
      text(`Date: ${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,width/2,height/2 + 200)
      text(`Leaderboard ID: ${this.#leaderboardID}`,width/2,height/2 + 250)
      saveCanvas(`Score EXPORT ${this.#username}`, 'jpg')
      pop()
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