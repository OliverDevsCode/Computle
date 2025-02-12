function createCustomButton(label,x,y,colour){
  let button = createButton(label)
  button.position(x,y)
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