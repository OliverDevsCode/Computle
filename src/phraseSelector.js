let dataset;
let previousPhrases = [];
function selectPhrase(){
  
  let datasetLength = 0;
  for(let i =0; i < dataset.length;i++){
    datasetLength += dataset[i].phrases.length;
  }
  // console.log("dataset length",datasetLength)
  let randomNum = Math.round(Math.random()*(dataset.length-1))
  let RandomTopic = dataset[randomNum]
  // console.log(randomNum)
  let TopicLength = RandomTopic.phrases.length
  
  randomNum = Math.round(Math.random()*(TopicLength-1))
  // console.log(randomNum)
  
  let RandomPhrase = RandomTopic.phrases[randomNum]
  // console.log("previousPhrases",JSON.stringify(previousPhrases))
  // console.log("RandomPhrase",RandomPhrase)
  
  // console.log("previousPhrases.length < datasetLength-1",previousPhrases.length < datasetLength-1)
  
  while(previousPhrases.includes(RandomPhrase)==true && previousPhrases.length < datasetLength){
    // console.log("already done")
    randomNum = Math.round(Math.random()*(dataset.length-1))
    RandomTopic = dataset[randomNum]
    TopicLength = RandomTopic.phrases.length
    randomNum = Math.round(Math.random()*(TopicLength-1))
    RandomPhrase = RandomTopic.phrases[randomNum]
  }
  

  
  if(previousPhrases.length == datasetLength){
    // console.log("ALL DONE")
    complete = true
    return ["DONE","DONE"]
  }else{
  previousPhrases.push(RandomPhrase)
  console.log(`Topic ${RandomTopic.topic}`);
  console.log(`Phrase ${RandomPhrase.toUpperCase()}`);
  return [RandomTopic.topic,RandomPhrase]
  }
  
  
  
  

}