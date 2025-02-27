
function answerClicked(){
    console.log("This is tesxt?");
    document.getElementById("question").innerHTML = "NEXT QUESTION";
    
    for (let index = 1; index < 5; index++) {
        document.getElementById("answer" + index).innerHTML = "NextAnswer" + index;
        
    }
}