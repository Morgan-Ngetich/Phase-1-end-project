document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector('.main-container');
  const wrapper = document.querySelector('.wrapper');
  const categoryBtn = document.querySelector('.categoryBtn');
  const commentDisplay = document.querySelector('.comment-display');
  const commentList = document.querySelector('.comment-list');
  const outputComment = document.querySelector('.comment-output')

  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
      console.log(data);
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

          const foodContainer = document.querySelector('.food-container');
          foodContainer.className = 'food-container';

          wrapper.appendChild(card);
          wrapper.appendChild(foodContainer);

          // Add click event to "ORDER" button
          const checkBtn = card.querySelector('.btn');
          checkBtn.addEventListener('click', function handleCheckBtnClick() {
            alert("You can now check the available foods!");

           
            // Clear the food container when checking available foods
            foodContainer.innerHTML = '';

            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
              .then(res => res.json())
              .then((data) => {
                const output = data.meals;

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
                  foodContainer.appendChild(itemDisplay);
                }
              });
            checkBtn.removeEventListener('click', handleCheckBtnClick);
          });
        }

        categoryBtn.removeEventListener('click', handleCategoryBtnClick);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

     // Add comments input form
     const textForm = document.getElementById("text-form");
     const textInput = document.getElementById("text-input");
     const textDisplay = document.getElementById("text-display");
   
     textForm.addEventListener("submit", function (e) {
       e.preventDefault();
       const text = textInput.value;
   
       if (text) {
         const textElement = document.createElement("p");
         textElement.textContent = text;
         textDisplay.appendChild(textElement);
   
         // Clear the input field after submission
         textInput.value = "";
       }
     });
     
});



