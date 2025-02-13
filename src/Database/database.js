let subjectsDB;

function getSubjects(){
    let list_of_subjects =[]
    let numOfSubs = subjectsDB.length
    for(let i=0; i < numOfSubs;i++){
        list_of_subjects.push([subjectsDB[i].subject,subjectsDB[i].filepath])
    }

    // console.log(list_of_subjects)

    list_of_subjects.sort()

    return list_of_subjects
}

function loadSubject(filepath){
    loadJSON(filepath,processData)
}

let currentSubjectData = [];
function processData(data) {
    if (data && data.items) {
      itemsArray = data.items;
    } else if (Array.isArray(data)) {
      // If your JSON is just an array, assign it directly.
      itemsArray = data;
    }
    // Log the loaded data to the console.
    // console.log("JSON loaded and processed:", itemsArray);
    currentSubjectData = itemsArray;
    let computle_data = selectPhrase(itemsArray);
    console.log(computle_data);
    sessionComputle = new Computle(computle_data[1],computle_data[0]);
    mode = 0 
  }