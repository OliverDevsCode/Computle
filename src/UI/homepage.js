function drawHomeScreen(){
    background(220);
    //create a dropdown menu
    let subjectSelect = createDropDown(getSubjects(),width/6,height/1.5,300,50)
    let enterButton = createButton("SELECT")
    enterButton.position(width/6 + 320,height/1.5)
    enterButton.style("font-family","Inter")
    enterButton.style("font-size","40px")
    enterButton.style("border-radius","10px")
    enterButton.style("color","green")
    push()
    fill(255,0,255)
    textAlign(CENTER)
    textFont("Inter")
    textStyle(BOLD)
    textSize(width/15)
    text("Welcome To Computle!",width/2,height/4)
    textSize(width/20)
    text("Select A Topic Below",width/2,height/2)
    pop()

    enterButton.mousePressed(startWordle);
    
}

function startWordle(){
    let wordle_data = selectPhrase()
    csWordle = new Wordle(wordle_data[1],wordle_data[0])
    mode = 0
    enterButton.hide()
    subjectSelect.hide()
}


/**
   * Create populated drop down menu
   * @function
   * @param {array} subjectList 
   * @param {*} x 
   * @param {*} y
   * @param {*} w 
   * @param {*} h  
   * @returns p5 object of a select.
   */

function createDropDown(subjectList,x,y,w,h){
    let name = createSelect();
    name.position(x, y);
    name.size(w,h)
    name.style('border-radius', '10px')
    name.style('font-family', 'Inter');
    name.style('font-size', '18px');
    name.style('border', '3px solid black')
    
    for(let p=0;p < subjectList.length;p++){
    let element = subjectList[p][0]
    name.option(element);
    }
    return name
  }
