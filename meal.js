document.addEventListener("DOMContentLoaded", () => {   
  const wrapper = document.querySelector('.wrapper');
  const categoryBtn = document.querySelector('.categoryBtn');
  const allComments = document.querySelector('.all-comments')

  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const results = data.categories;

      categoryBtn.addEventListener('click', function handleCategoryBtnClick() {
        for (const category of results) {
          const card = document.createElement('div');       
          card.innerHTML = `
            <div class="card">
              <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
              <div class="info">
                <h1>${category.strCategory}</h1>
                <p>${category.strCategoryDescription}</p> 
                <button class="btn">CHECK</button>
              </div>
            </div>`;
          const foodContainer = document.querySelector('.food-container'); // Create a container for food items
          foodContainer.className = 'food-container';
          wrapper.appendChild(card);
          wrapper.appendChild(foodContainer); // Append the food container

          // Add click event to "ORDER" button
          const checkBtn = card.querySelector('.btn');
          checkBtn.addEventListener('click', function handleCheckBtnClick() {
            alert("You can Now check the available foods!");
            

            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
              .then(res => res.json())
              .then((data) => {
                console.log(data);
                const output = data.meals;

                foodContainer.innerHTML = " "

                for (const item of output) {
                  const itemDisplay = document.createElement('div');                      
                  itemDisplay.innerHTML = `
                    <div class="food-card">
                      <div class="food-header">
                        <img src="${item.strMealThumb}" alt="${item.strMeal}">                      
                        <h1 class="food-text">${item.strMeal}</h1>  
                      </div>                                        
                    </div>
                    `;
                  foodContainer.appendChild(itemDisplay); // Append food items to the appropriate container
                }
              });
              checkBtn.removeEventListener('click', handleCheckBtnClick)

             
          });          
        }
        
        // Remove the event listener after the first click       
        categoryBtn.removeEventListener('click', handleCategoryBtnClick)
       
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
