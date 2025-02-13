function drawHomeScreen(subjects){
    background(220);
    //create a dropdown menu
    let subjectSelect = createDropDown(subjects,width/6,height/1.5,300,50)
    let enterButton = createCustomButton("SELECT",width/6 + 320,height/1.5,"#00FF00")
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

    enterButton.mousePressed(() => startcomputle(subjectSelect,enterButton,subjects));
}

function startcomputle(subjectSelect,enterButton,subject_list){
    //create menu
    createMenu(width-40,10)
    let subject = subjectSelect.value()// get user selected subject
    userdata.currentSubject = subject
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



