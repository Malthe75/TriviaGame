function goToCategory(categoryId){
    window.location.href = `index.html?category=${categoryId}`;
}

window.onload = function(){
fetchCategories();
}

var categoryData = [];

function fetchCategories(){

    const url = "https://opentdb.com/api_category.php"

    fetch(url).then(response =>{
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        return response.json();
    })
    .then(data => {
        data.trivia_categories.forEach(category => {
            console.log(`ID: ${category.id}, Name: ${category.name}`);
        });
        categoryData = data.trivia_categories;
        createCategories();
      })
      .catch(error => {
        // Catch and log any errors
        console.error('There was an error with the fetch operation:', error);
      });
}

function createCategories(){

    // Event listener
    const categoryDiv = document.getElementById('categoryDiv');
    categoryDiv.addEventListener("click", function(event){
        if(event.target.classList.contains("category-button")){
            const categoryId = event.target.getAttribute("data-id");
            goToCategory(categoryId);
        }
    })

    // Create buttons for each category
    for (let i = 0; i < categoryData.length; i++) {
        var v = document.createElement('button');
        v.textContent = categoryData[i].name;
        v.classList.add("category-button");
        v.setAttribute("data-id", categoryData[i].id); 

        categoryDiv.appendChild(v);

  
    }
}