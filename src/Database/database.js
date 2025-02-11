let subjectsDB;

function getSubjects(){
    let list_of_subjects =[]
    let numOfSubs = subjectsDB.length
    for(let i=0; i < numOfSubs;i++){
        list_of_subjects.push([subjectsDB[i].subject,subjectsDB[i].filepath])
    }

    console.log(list_of_subjects)

    return list_of_subjects
}