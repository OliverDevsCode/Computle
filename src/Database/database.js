let subjectsDB;

function getSubjects(){
    let list_of_subjects =[]
    let numOfSubs = subjectsDB.length
    for(let i=0; i < numOfSubs;i++){
        list_of_subjects.push([subjectsDB[i].subject,subjectsDB[i].request])
    }

    // console.log(list_of_subjects)

    list_of_subjects.sort()

    return list_of_subjects
}

// function loadSubject(filepath){
//     loadJSON(filepath,processData)
// }

async function loadSubject(request){
  const response = await getDatabase(request)
  processData(response.data)
}

async function getDatabase(request){
  return fetch('https://computle-backend.vercel.app/api/database'+request, {
    method: 'GET',
    // credentials: 'include'  // Ensures that cookies are sent with the request POTENTIAL FIX
  })
  .then(response => response.json())
  .then(data => {
    if (data !== undefined) {
      const subjectFile = data; // Update subjectFile with the file from the server
      // console.log("subjectFile:", subjectFile);
      return subjectFile
    } else {
      console.error('No subjectFile');
    }
  })
  .catch(error => {
    console.error('Error fetching score:', error);
  });
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