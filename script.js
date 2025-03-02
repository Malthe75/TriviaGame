
window.onload = function() {
    handleJson("Thecategory");  // This runs when index.html loads
};

function answerClicked(){
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

    nextQuestion();

}

function showDiv(divId) {
    document.getElementById('multipleDiv').style.display = 'none';
    document.getElementById('booleanDiv').style.display = 'none';
    
    document.getElementById(divId).style.display = 'block';
}

var questionNumber = 0;
var triviaData = [];

function nextQuestion(){
    document.getElementById("question").innerHTML = triviaData.results[questionNumber].question;
    questionNumber++;
}


function handleJson(category){
    const url = whichUrl(category);

    fetch(url).then(response =>{
        if(!response.ok){
            throw new Error("Network resposne was not ok")
        }
        return response.json();
    })
    .then(data => {
        triviaData = data;
        // Example: Looping through the questions and logging them
        data.results.forEach((question, index) => {
          console.log(`Question ${index + 1}: ${question.question}`);
          console.log(`Correct Answer: ${question.correct_answer}`);
        });
        
      answerClicked();
      })
      .catch(error => {
        // Catch and log any errors
        console.error('There was an error with the fetch operation:', error);
      });

    }

function handleQuestion(){

}

function whichUrl(category){
    return "https://opentdb.com/api.php?amount=10&category=31"
}

