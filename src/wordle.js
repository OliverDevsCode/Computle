class Wordle{
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
    // console.log("Correct Word",this.phrase)
    if(this.input.length<this.phrase.length){
      // console.log("PLEASE COMPLETE WORD")
    }else{
    this.previousInputs.push(this.input)
    for(let i=0; i<this.input.length;i++){
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
        this.correctLetters.push([this.input[i],i])
        
        }  
      }
      if(this.phrase.includes(this.input[i]) == true && (this.input[i]==this.phrase[i]) == false){
        //wrong place
        let value = [this.input[i],i]
        let add = true;
        for(let k =0; k < this.missplacedLetters.length;k++){
          if(this.missplacedLetters[k][0]==value[0] && this.missplacedLetters[k][1]==value[1]){
            add = false
          }
        }
        if(add == true){
        this.missplacedLetters.push([this.input[i],i])
        
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
        this.wrongLetters.push([this.input[i],i])
        
        } 
    }
      
    }//end of for loop
  
    this.attempts ++ // increment attempts 
    this.input = [] //reset input
      
    // console.log("Correct Letters",JSON.stringify(this.correctLetters))
    // console.log("Missplaced Letters",JSON.stringify(this.missplacedLetters))
    // console.log("Wrong Letters",JSON.stringify(this.wrongLetters))
      
    //check if correct
    if(this.correctLetters.length == this.phrase.length){
      // console.log("Well Done Correct!")
      this.#solved = true
      submitScore(1,this.#solved)
      answerStreak ++
      return true
    }else{
      // console.log("try again")
      if(this.attempts==5){
        answerStreak = 0
      }
      return false
    }
      
    }//end of else
    
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
        for(let w = 0; w < this.previousInputs[i].length;w++){
        //check fill of box
        push()
        // fill(230)
        fill(this.boxColour(this.previousInputs[i][w],w))
        rect(offsetX + (boxW *w),offsetX + (boxW *(i*1.2)),boxW,boxW)
        fill(0)
        textAlign(CENTER)
        textFont("Inter")
        textStyle(BOLD)
        textSize(boxW*0.8)
        // text(this.previousInputs[i][w],80 + (boxW *w),110 + (boxW *(i*1.2)))
        text(this.previousInputs[i][w],offsetX + (boxW *w) + boxW/2,offsetX + (boxW *(i*1.2)) + (boxW*0.8))
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
      textSize(width/8)
      text("Well Done!",width/2,height/2)
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
      let charWidthFactor = 0.6; // Adjust as needed for Inter
      textSize(400/ (message.length * charWidthFactor))
      text(message,width/2,height/2)
      pop()
      goAgain.show()
    }
    
    push()
    fill(0)
    textAlign(CENTER)
    textFont("Inter")
    textStyle(BOLD)
    textSize(width/25)
    text(`Topic: ${this.topic}`,width/2,maxH/3)
    pop()
  }
  
 
  
}
