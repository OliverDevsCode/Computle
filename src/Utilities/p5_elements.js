function createCustomButton(label,x,y,colour){
  let button = createButton(label)
  let xOFFSET = (windowWidth - width) / 2;
  let yOFFSET = (windowHeight - height) / 2;
  button.position(x+xOFFSET,y+yOFFSET)
  button.style("font-family","Inter")
  button.style("font-size","40px")
  button.style("border-radius","10px")
  button.style("color",colour)
  // Add hover effects
  button.mouseOver(() => {
    button.style("background-color", colour); 
    button.style("color", "white"); 
  });

  button.mouseOut(() => {
    button.style("background-color", "white"); 
    button.style("color", colour); 
  });
  return button;
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
  let xOFFSET = (windowWidth - width) / 2;
  let yOFFSET = (windowHeight - height) / 2;
  let name = createSelect();
  name.position(x+xOFFSET, y+yOFFSET);
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

function createCustomInput(x,y,colour){
  let input = createInput()
  let xOFFSET = (windowWidth - width) / 2;
  let yOFFSET = (windowHeight - height) / 2;
  input.position(x+xOFFSET,y+yOFFSET)
  input.style("font-family","Inter")
  input.style("font-size","40px")
  input.style("border-radius","10px")
  input.style("color",colour)
  // Add hover effects
  input.mouseOver(() => {
    input.style("background-color", colour); 
    input.style("color", "black"); 
  });

  input.mouseOut(() => {
    input.style("background-color", "white"); 
    input.style("color", colour); 
  });
  return input;
}