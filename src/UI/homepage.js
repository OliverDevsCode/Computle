function drawHomeScreen(subjects){
    background(220);
    //create a dropdown menu
    let subjectSelect = createDropDown(subjects,width/6,height/1.5,300,50)
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

    enterButton.mousePressed(() => startWordle(subjectSelect,enterButton,subjects));
}

function startWordle(subjectSelect,enterButton,subject_list){
    let subject = subjectSelect.value()// get user selected subject
    let subject_path = getSubjectPath(subject,subject_list) // get path
    loadSubject(subject_path)
    // console.log(`Subject Path ${subject_path}`)
    enterButton.remove()
    subjectSelect.remove()
}

function getSubjectPath(input,list){
    let path;
    for(let i=0; i < list.length;i++){
        if(list[i][0] == input){
            path = list[i][1];
        }
    }
    return path
}



