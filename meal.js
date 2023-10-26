document.addEventListener("DOMContentLoaded", () => {   
  const wrapper = document.querySelector('.wrapper');
  const categoryBtn = document.querySelector('.categoryBtn');

  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
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
          
         
          
        }
        
        // Remove the event listener after the first click
       

       
      });
    })
    
});
