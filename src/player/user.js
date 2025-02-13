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
  
    constructor(){
      this.#score = 0
      this.#streak = 0
    }
  
    async init(){
      this.#username = await getUsername();
      return this;
    }
  
    addScore(val){
      this.#score += val
    }
  
    addStreak(val){
      this.#streak += val
    }

    setHashScore(val){
      this.#hashScore = val
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
    
  
  }