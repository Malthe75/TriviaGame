
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    handleJson(params.get("category"));
};

function answerClicked(event){
    
    const question = triviaData.results[questionNumber];

    let correct_answer = decodeHtmlEntities(question.correct_answer);
    let button_text = event.target.innerText;
    
    if(correct_answer == button_text){
        ifCorrect();
        console.log("is corerect!")
    }
    questionNumber++;
    if(triviaData.results.length-1 >= questionNumber){
    nextQuestion();
    }else{
        onFinished();
    }

}

let points = 0;
function ifCorrect(){
    points++;
    document.getElementById("points").innerHTML = "Points: " + points;
}

function showDiv(divId) {
    document.getElementById('multipleDiv').style.display = 'none';
    document.getElementById('booleanDiv').style.display = 'none';
    
    document.getElementById(divId).style.display = 'block';
}

var questionNumber = 0;
var triviaData = [];

function nextQuestion(){

    const question = triviaData.results[questionNumber];

    
    const answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    // Fisher-yates for randomness.
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = answers[i];
        answers[i] = answers[j];
        answers[j] = temp;
    }

    if(question.type == "multiple"){
        showDiv('multipleDiv')
        answers.forEach((answer, index) => {
            document.getElementById("answer" + (index+1)).innerHTML = answer;
        });
    }else{
        showDiv('booleanDiv')
        answers.forEach((answer, index) => {
            document.getElementById("booleanAnswer" + (index+1)).innerHTML = answer;
        }); 
    }

    document.getElementById("question").innerHTML = triviaData.results[questionNumber].question;
}



// Retries fetch after 3 seconds if there are too many requests to the API.
const fetchTrivia = async (url) => {
    const response = await fetch(url);
    if(response.status === 429){
        console.log(response);
        const retryAfter = 3;
        console.log(`Rate limited! Retrying in ${retryAfter} seconds.`)
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        return fetchTrivia(url); 
    }else{
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json();
}
}

function handleJson(category){
    const url = whichUrl(category);

    /* 
    fetch(url).then(response =>{
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        return response.json();
    })*/
   fetchTrivia(url)
    .then(data => {
        triviaData = data;
        // Example: Looping through the questions and logging them
        data.results.forEach((question, index) => {
          console.log(`Question ${index + 1}: ${question.question}`);
          console.log(`Correct Answer: ${question.correct_answer}`);
        });
        
      nextQuestion();
      })
      .catch(error => {
        // Catch and log any errors
        console.error('There was an error with the fetch operation:', error);
      });

    }

function handleQuestion(){

}

function whichUrl(category){
    return `https://opentdb.com/api.php?amount=10&category=${category}`
}


function decodeHtmlEntities(text) {
    let parser = new DOMParser();
    let decodedText = parser.parseFromString(text, "text/html").body.textContent;
    return decodedText;
}


function onFinished(){
    document.getElementById("questions").style.display = 'none';
    document.getElementById("finishDiv").style.display = 'block';
}

function goToHome(){
    window.location.href = "homepage.html";
}