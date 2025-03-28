class Computle{
  phrase;
  answer;
  topic;
  attempts;
  #solved;
  input;
  correctLetters;
  wrongLetters;
  missplacedLetters;
  previousInputs;
  
  constructor(phrase,topic){
    this.phrase = phrase.split("");
    this.answer = phrase
    this.topic = topic;
    this.attempts = 0;
    this.#solved = false;
    this.input = [];
    this.correctLetters = [];
    this.wrongLetters = [];
    this.missplacedLetters = [];
    this.previousInputs = [];
    this.repeatedLetters = [];
  }

  get solved(){
    return this.#solved
  }
  set solved(value) {
    this.#solved = value;
  }
  
  inputLetter(string){
    //only add when input <= phrase.length
    if(this.input.length == this.phrase.length || this.#solved == true){
      //full
      // console.log("full")
    }else{
      this.input.push(string)
    }
    // console.log("added",this.input)
  }
  
  removeLetter(){
    this.input.pop()
    // console.log("removed",this.input)
  
  }
  
  guess(){

    //ACCESSIBLITY
    const colourConfig = localStorage.getItem("colourblind")
    console.log(colourConfig)

    let currentGuess = []
    
    // console.log("Correct Word",this.phrase)
    if(this.input.length<this.phrase.length){
      // console.log("PLEASE COMPLETE WORD")
    }else{
    // this.previousInputs.push(this.input)
    this.correctLetters = [];
    this.wrongLetters = [];
    this.missplacedLetters = [];
    this.repeatedLetters = [];
    for(let i =0; i <this.input.length;i++){
      if(this.input[i]==this.phrase[i]){
        //correct place
        let value = [this.input[i],i]
        let add = true;
        for(let k =0; k < this.correctLetters.length;k++){
          if(this.correctLetters[k][0]==value[0] && this.correctLetters[k][1]==value[1]){
            add = false
          }
        }
        if(add == true){
        //check if missplaced includes it and remove it
        // console.log("TRUE -- missplaced",JSON.stringify(this.missplacedLetters))
        // console.log("checking if",JSON.stringify([this.input[i],i]))

        for(let p=0; p< this.missplacedLetters.length;p++){
          if(this.missplacedLetters.includes([this.input[i],i])){
            // console.log("missplaced",JSON.stringify(this.missplacedLetters))
            // console.log("REMOVE from missplaced now")
            this.missplacedLetters.slice(p,p)
          }
        }

        // console.log(" END OF TRUE IF The list of missplaced letters is",this.missplacedLetters)



        this.correctLetters.push([this.input[i],i,'#00FF00'])
        currentGuess.push([this.input[i],i,'#00FF00'])
        
        }  
      }
    }//correct letters loop end - must got before rest to find duplicates
    for(let i=0; i<this.input.length;i++){
      
      if(this.phrase.includes(this.input[i]) == true && (this.input[i]==this.phrase[i]) == false){

        // console.log(`${this.phrase} INCLUDES ${this.input[i]}`)

        let letterToCheck = this.phrase.filter(letter => letter === this.input[i]);
        let occurence = 0;
        for(let k = 0; k < this.correctLetters.length;k++){
          // console.log("this.correctLetters[k][0]",this.correctLetters[k][0])
          // console.log("this.input[i]",this.input[i])
          if(this.correctLetters[k][0] == this.input[i]){
            occurence ++
          }
        }
        // console.log(`How many time,${this.phrase[i]}, appears in phrase ${letterToCheck.length}`)
        // console.log("Repeated Letters",JSON.stringify(this.repeatedLetters))
        // console.log("OCCURENCE BEFORE SECOND LOOP",occurence)
        if(occurence != letterToCheck.length){
          // console.log("Checking repeated aswell")
          for(let k = 0; k < this.missplacedLetters.length;k++){
            // console.log("this.missplacedLetters[k][0]",this.missplacedLetters[k][0])
            // console.log("this.input[i]",this.input[i])
            if(this.missplacedLetters[k][0] == this.input[i]){
              occurence ++
            }
        } 
        }
        // console.log("compaer to:",letterToCheck.length)
        // console.log("occurence",occurence)
        // console.log("Repeated letters",JSON.stringify(this.repeatedLetters))

        if(occurence == letterToCheck.length){
          // console.log("letter already solved")
          if(colourConfig =="false"){
            this.repeatedLetters.push([this.input[i],i,'#FF0000'])
            currentGuess.push([this.input[i],i,'#FF0000'])
          }else{
            this.repeatedLetters.push([this.input[i],i,'#555555'])
            currentGuess.push([this.input[i],i,'#555555'])
          }
          

          
        }else{
          //wrong place
        let value = [this.input[i],i]
        let add = true;
        for(let k =0; k < this.missplacedLetters.length;k++){
          if(this.missplacedLetters[k][0]==value[0] && this.missplacedLetters[k][1]==value[1]){
            add = false
          }
        }
        if(add == true){
        if(colourConfig == "false"){
          this.missplacedLetters.push([this.input[i],i,'#FFFF00'])
          currentGuess.push([this.input[i],i,'#FFFF00'])
        }else{
          this.missplacedLetters.push([this.input[i],i,'#1E90FF'])
          currentGuess.push([this.input[i],i,'#1E90FF'])
        }
        
        } 
        }
        
        
      }
      if(this.phrase.includes(this.input[i]) == false){
        //wrong letter
        let value = [this.input[i],i]
        let add = true;
        for(let k =0; k < this.wrongLetters.length;k++){
          if(this.wrongLetters[k][0]==value[0] && this.wrongLetters[k][1]==value[1]){
            add = false
          }
        }
        if(add == true){
        if(colourConfig == "false"){
          this.wrongLetters.push([this.input[i],i,'#FF0000'])
          currentGuess.push([this.input[i],i,'#FF0000'])
        }else{
          this.wrongLetters.push([this.input[i],i,'#1E90FF'])
        currentGuess.push([this.input[i],i,'#1E90FF'])
        }
        
        } 
    }
      
    }//end of for loop
  
    this.attempts ++ // increment attempts 

    // console.log("END OF GUESS")   
    // console.log("correct;",JSON.stringify(this.correctLetters))   
    // console.log("missplaced;",JSON.stringify(this.missplacedLetters))   
    // console.log("wrong letter",JSON.stringify(this.wrongLetters))
    // console.log("already used",JSON.stringify(this.repeatedLetters))

    //order currentGuess by index position
    // console.log("The archive version before",JSON.stringify(currentGuess));
    currentGuess = currentGuess.sort((a, b) => a[1] - b[1]);
    this.previousInputs.push(currentGuess)
    // console.log("The archive version",JSON.stringify(currentGuess));
  
      
    //check if correct
    if(this.correctLetters.length == this.phrase.length){
      let solvedCorrectly = true
      for(let j =0;j<this.phrase.length;j++){
        if(this.input[j] != this.phrase[j]){
          solvedCorrectly = false
          // console.log("NOT SOLVED")
        }
      }
      if(solvedCorrectly == true){
        // console.log("Well Done Correct!")
          this.#solved = true
          let pointsToAdd = Math.floor(sessionComputle.calculateMultiplier(answerStreak,7-this.attempts))
          submitScore(parseInt(userdata.score) + pointsToAdd,this.#solved)
          answerStreak ++
          this.input = [] //reset input
          return true
      }else{
          if(this.attempts==5){
          answerStreak = 0
          }
          this.input = [] //reset input
          return false
      }
      
    }else{
      // console.log("try again")
      if(this.attempts==5){
        answerStreak = 0
      }
      this.input = [] //reset input
      return false
    }

      
    }//end of else

  }

  calculateMultiplier(streak, score) {
    return (((1 - Math.pow(1.24, -(streak))) *1.15) + 1) * score;
  }
  
  boxColour(letter,index){    
    if(this.correctLetters.length > 0){
      for(let i =0;i<this.correctLetters.length;i++){
        if(this.correctLetters[i][0] == letter && this.correctLetters[i][1] == index){
        return "#00FF00"
        }
      }
    }//if end
    
    if(this.missplacedLetters.length > 0){
      for(let i =0;i<this.missplacedLetters.length;i++){
        if(this.missplacedLetters[i][0] == letter && (this.missplacedLetters[i][1] == index)){
        return "#FFFF00"
        }
      }
    }//if end
    
    if(this.wrongLetters.length > 0){
      for(let i =0;i<this.wrongLetters.length;i++){
        if(this.wrongLetters[i][0] == letter && (this.wrongLetters[i][1] == index)){
        return "#FF0000"
        }
      }
    }//if end

    if(this.repeatedLetters.length > 0){
      for(let i =0;i<this.repeatedLetters.length;i++){
        if(this.repeatedLetters[i][0] == letter && (this.repeatedLetters[i][1] == index)){
        return "#FF0000"// actual colour
        }
      }
    }//if end

    if(this.repeatedLetters.length == 0 && this.wrongLetters ==0 && this.correctLetters == 0 && this.repeatedLetters ==0){
      return "#FF0000"// actual colour
      
    }
    
  }
  
  draw(){
    let boxW = 520/this.phrase.length
    let maxH = (800-(boxW*1.2*2.75))/this.phrase.length
    
    if(maxH < boxW){
      boxW = maxH;
    }
    //center the boxes
    let rowLength = boxW * this.phrase.length
    let maxDepth = boxW * 5;
    let offsetX = (600-rowLength)/2
    let offsetY = (600-maxDepth)/2
    for(let i = 0; i <= 5;i++){
      for(let w =0; w < this.phrase.length;w++){
        push()
        fill(230)
        rect(offsetX + (boxW *w),offsetX + (boxW *(i*1.2)),boxW,boxW)
        if(i==this.attempts && this.input.length>0){
        push()
        fill(255)
        rect(offsetX + (boxW *w),offsetX + (boxW *(i*1.2)),boxW,boxW)
        fill(0)
        textAlign(CENTER)
        textFont("Inter")
        textStyle(BOLD)
        textSize(boxW*0.8)
        // text(this.input[w],80 + (boxW *w),110 + (boxW *(i*1.2)))
        text(this.input[w],offsetX + (boxW *w) + boxW/2,offsetX + (boxW *(i*1.2)) + (boxW*0.8))
        pop()
        }
        pop()
      }//enf of for
      
      //drawing each previous
      if(this.attempts>0 && i<this.attempts){
        // console.log(this.previousInputs)
        for(let w = 0; w < this.previousInputs[i].length;w++){
        //check fill of box
        push()
        // fill(230)
        // console.log("this.previousInputs[i][w][2]",this.previousInputs[i][w])
        fill(this.previousInputs[i][w][2])
        rect(offsetX + (boxW *w),offsetX + (boxW *(i*1.2)),boxW,boxW)
        fill(0)
        textAlign(CENTER)
        textFont("Inter")
        textStyle(BOLD)
        textSize(boxW*0.8)
        // text(this.previousInputs[i][w],80 + (boxW *w),110 + (boxW *(i*1.2)))
        text(this.previousInputs[i][w][0],offsetX + (boxW *w) + boxW/2,offsetX + (boxW *(i*1.2)) + (boxW*0.8))
        pop()
      }//enf of for
      
      }//end of if
    }
    
    if(this.#solved == true){
      push()
      fill('#00FF00')
      rect(100,320,400,110,10)
      fill(0)
      textAlign(CENTER)
      textFont("Inter")
      textStyle(BOLD)
      textSize(600/8)
      text("Well Done!",600/2,height/2)
      pop()
    }
    
    if(this.#solved == false && this.attempts == 6){
      push()
      fill('#FCE205')
      rect(100,320,400,110,10)
      fill(0)
      textAlign(CENTER)
      textFont("Inter")
      textStyle(BOLD)
      let message = `Unlucky! Answer:${this.answer}`
      let char600Factor = 0.6; // Adjust as needed for Inter
      textSize(400/ (message.length * char600Factor))
      text(message,600/2,height/2)
      pop()
      goAgain.show()
    }
    
    push()
    fill(0)
    textAlign(CENTER)
    textFont("Inter")
    textStyle(BOLD)
    textSize(600/25)
    text(`Topic: ${this.topic}`,600/2,maxH/3)
    pop()
  }
  
 
  
}
