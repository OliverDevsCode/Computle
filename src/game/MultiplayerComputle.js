class MultiplayerComputle extends Computle{
  xOffset;
  constructor(phrase,topic,x){
    super(phrase,topic);
    this.xOffset = x;
  }
  get solved(){
    return super.solved
  }
  
  inputLetter(string){
    //only add when input <= phrase.length
    if(super.input.length == super.phrase.length || super.solved == true){
      //full
      // console.log("full")
    }else{
      super.input.push(string)
    }
    // console.log("added",super.input)
  }
  
  removeLetter(){
    super.input.pop()
    // console.log("removed",super.input)
  
  }
  
  guess(){

    let currentGuess = []
    
    // console.log("Correct Word",super.phrase)
    if(super.input.length<super.phrase.length){
      // console.log("PLEASE COMPLETE WORD")
    }else{
    // super.previousInputs.push(super.input)
    super.correctLetters = [];
    super.wrongLetters = [];
    super.missplacedLetters = [];
    super.repeatedLetters = [];
    for(let i =0; i <super.input.length;i++){
      if(super.input[i]==super.phrase[i]){
        //correct place
        let value = [super.input[i],i]
        let add = true;
        for(let k =0; k < super.correctLetters.length;k++){
          if(super.correctLetters[k][0]==value[0] && super.correctLetters[k][1]==value[1]){
            add = false
          }
        }
        if(add == true){
        //check if missplaced includes it and remove it
        // console.log("TRUE -- missplaced",JSON.stringify(super.missplacedLetters))
        // console.log("checking if",JSON.stringify([super.input[i],i]))

        for(let p=0; p< super.missplacedLetters.length;p++){
          if(super.missplacedLetters.includes([super.input[i],i])){
            // console.log("missplaced",JSON.stringify(super.missplacedLetters))
            // console.log("REMOVE from missplaced now")
            super.missplacedLetters.slice(p,p)
          }
        }

        // console.log(" END OF TRUE IF The list of missplaced letters is",super.missplacedLetters)

        super.correctLetters.push([super.input[i],i,'#00FF00'])
        currentGuess.push([super.input[i],i,'#00FF00'])
        
        }  
      }
    }//correct letters loop end - must got before rest to find duplicates
    for(let i=0; i<super.input.length;i++){
      
      if(super.phrase.includes(super.input[i]) == true && (super.input[i]==super.phrase[i]) == false){

        // console.log(`${super.phrase} INCLUDES ${super.input[i]}`)

        let letterToCheck = super.phrase.filter(letter => letter === super.input[i]);
        let occurence = 0;
        for(let k = 0; k < super.correctLetters.length;k++){
          // console.log("super.correctLetters[k][0]",super.correctLetters[k][0])
          // console.log("super.input[i]",super.input[i])
          if(super.correctLetters[k][0] == super.input[i]){
            occurence ++
          }
        }
        // console.log(`How many time,${super.phrase[i]}, appears in phrase ${letterToCheck.length}`)
        // console.log("Repeated Letters",JSON.stringify(super.repeatedLetters))
        // console.log("OCCURENCE BEFORE SECOND LOOP",occurence)
        if(occurence != letterToCheck.length){
          // console.log("Checking repeated aswell")
          for(let k = 0; k < super.missplacedLetters.length;k++){
            // console.log("super.missplacedLetters[k][0]",super.missplacedLetters[k][0])
            // console.log("super.input[i]",super.input[i])
            if(super.missplacedLetters[k][0] == super.input[i]){
              occurence ++
            }
        } 
        }
        // console.log("compaer to:",letterToCheck.length)
        // console.log("occurence",occurence)
        // console.log("Repeated letters",JSON.stringify(super.repeatedLetters))

        if(occurence == letterToCheck.length){
          // console.log("letter already solved")
          super.repeatedLetters.push([super.input[i],i,'#FF0000'])
          currentGuess.push([super.input[i],i,'#FF0000'])

          
        }else{
          //wrong place
        let value = [super.input[i],i]
        let add = true;
        for(let k =0; k < super.missplacedLetters.length;k++){
          if(super.missplacedLetters[k][0]==value[0] && super.missplacedLetters[k][1]==value[1]){
            add = false
          }
        }
        if(add == true){
        super.missplacedLetters.push([super.input[i],i,'#FFFF00'])
        currentGuess.push([super.input[i],i,'#FFFF00'])
        } 
        }
        
        
      }
      if(super.phrase.includes(super.input[i]) == false){
        //wrong letter
        let value = [super.input[i],i]
        let add = true;
        for(let k =0; k < super.wrongLetters.length;k++){
          if(super.wrongLetters[k][0]==value[0] && super.wrongLetters[k][1]==value[1]){
            add = false
          }
        }
        if(add == true){
        super.wrongLetters.push([super.input[i],i,'#FF0000'])
        currentGuess.push([super.input[i],i,'#FF0000'])
        
        } 
    }
      
    }//end of for loop
  
    super.attempts ++ // increment attempts 

    // console.log("END OF GUESS")   
    // console.log("correct;",JSON.stringify(super.correctLetters))   
    // console.log("missplaced;",JSON.stringify(super.missplacedLetters))   
    // console.log("wrong letter",JSON.stringify(super.wrongLetters))
    // console.log("already used",JSON.stringify(super.repeatedLetters))

    //order currentGuess by index position
    // console.log("The archive version before",JSON.stringify(currentGuess));
    currentGuess = currentGuess.sort((a, b) => a[1] - b[1]);
    super.previousInputs.push(currentGuess)
    // console.log("The archive version",JSON.stringify(currentGuess));
  
      
    //check if correct
    if(super.correctLetters.length == super.phrase.length){
      let solvedCorrectly = true
      for(let j =0;j<super.phrase.length;j++){
        if(super.input[j] != super.phrase[j]){
          solvedCorrectly = false
          // console.log("NOT SOLVED")
        }
      }
      if(solvedCorrectly == true){
        // console.log("Well Done Correct!")
          super.solved = true
          // let pointsToAdd = Math.floor(sessionComputle.calculateMultiplier(answerStreak,7-super.attempts))
          // submitScore(parseInt(userdata.score) + pointsToAdd,super.solved)
          console.log("correct")
          answerStreak ++
          super.input = [] //reset input
          return true
      }else{
          if(super.attempts==5){
          answerStreak = 0
          }
          super.input = [] //reset input
          return false
      }
      
    }else{
      // console.log("try again")
      if(super.attempts==5){
        answerStreak = 0
      }
      super.input = [] //reset input
      return false
    }

      
    }//end of else

  }

  calculateMultiplier(streak, score) {
    return (((1 - Math.pow(1.24, -(streak))) *1.15) + 1) * score;
  }
  
  boxColour(letter,index){    
    if(super.correctLetters.length > 0){
      for(let i =0;i<super.correctLetters.length;i++){
        if(super.correctLetters[i][0] == letter && super.correctLetters[i][1] == index){
        return "#00FF00"
        }
      }
    }//if end
    
    if(super.missplacedLetters.length > 0){
      for(let i =0;i<super.missplacedLetters.length;i++){
        if(super.missplacedLetters[i][0] == letter && (super.missplacedLetters[i][1] == index)){
        return "#FFFF00"
        }
      }
    }//if end
    
    if(super.wrongLetters.length > 0){
      for(let i =0;i<super.wrongLetters.length;i++){
        if(super.wrongLetters[i][0] == letter && (super.wrongLetters[i][1] == index)){
        return "#FF0000"
        }
      }
    }//if end

    if(super.repeatedLetters.length > 0){
      for(let i =0;i<super.repeatedLetters.length;i++){
        if(super.repeatedLetters[i][0] == letter && (super.repeatedLetters[i][1] == index)){
        return "#FF0000"// actual colour
        }
      }
    }//if end

    if(super.repeatedLetters.length == 0 && super.wrongLetters ==0 && super.correctLetters == 0 && super.repeatedLetters ==0){
      return "#FF0000"// actual colour
      
    }
    
  }
  
  draw(){
    let boxW = 520/super.phrase.length
    let maxH = (800-(boxW*1.2*2.75))/super.phrase.length
    
    if(maxH < boxW){
      boxW = maxH;
    }
    //center the boxes
    let rowLength = boxW * super.phrase.length
    let maxDepth = boxW * 5;
    let offsetX = (600-rowLength)/2
    let offsetY = (600-maxDepth)/2
    for(let i = 0; i <= 5;i++){
      for(let w =0; w < super.phrase.length;w++){
        push()
        fill(230)
        rect(offsetX + (boxW *w)+ super.xOffset,offsetX + (boxW *(i*1.2)),boxW,boxW)
        if(i==super.attempts && super.input.length>0){
        push()
        fill(255)
        rect(offsetX + (boxW *w)+ super.xOffset,offsetX + (boxW *(i*1.2)),boxW,boxW)
        fill(0)
        textAlign(CENTER)
        textFont("Inter")
        textStyle(BOLD)
        textSize(boxW*0.8)
        // text(super.input[w],80 + (boxW *w),110 + (boxW *(i*1.2)))
        text(super.input[w],offsetX + (boxW *w) + boxW/2+ super.xOffset,offsetX + (boxW *(i*1.2)) + (boxW*0.8))
        pop()
        }
        pop()
      }//enf of for
      
      //drawing each previous
      if(super.attempts>0 && i<super.attempts){
        // console.log(super.previousInputs)
        for(let w = 0; w < super.previousInputs[i].length;w++){
        //check fill of box
        push()
        // fill(230)
        // console.log("super.previousInputs[i][w][2]",super.previousInputs[i][w])
        fill(super.previousInputs[i][w][2])
        rect(offsetX + (boxW *w)+ super.xOffset,offsetX + (boxW *(i*1.2)),boxW,boxW)
        fill(0)
        textAlign(CENTER)
        textFont("Inter")
        textStyle(BOLD)
        textSize(boxW*0.8)
        // text(super.previousInputs[i][w],80 + (boxW *w),110 + (boxW *(i*1.2)))
        text(super.previousInputs[i][w][0],offsetX + (boxW *w) + boxW/2+ super.xOffset,offsetX + (boxW *(i*1.2)) + (boxW*0.8))
        pop()
      }//enf of for
      
      }//end of if
    }
    
    if(super.solved == true){
      push()
      fill('#00FF00')
      rect(100+ super.xOffset,320,400,110,10)
      fill(0)
      textAlign(CENTER)
      textFont("Inter")
      textStyle(BOLD)
      textSize(600/8)
      text("Well Done!",600/2 + super.xOffset,height/2 - 50)
      pop()
    }
    
    if(super.solved == false && super.attempts == 6){
      push()
      fill('#FCE205')
      rect(100,320,400,110,10)
      fill(0)
      textAlign(CENTER)
      textFont("Inter")
      textStyle(BOLD)
      let message = `Unlucky! Answer:${super.answer}`
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
    textSize(600/25)
    let topicPos = offsetX + (boxW * super.phrase.length)/2
    text(`Topic: ${super.topic}`,topicPos+ super.xOffset,maxH/3 + 20)
    pop()
  }

}