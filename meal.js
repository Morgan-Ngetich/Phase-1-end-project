document.addEventListener("DOMContentLoaded", () => {   
  const wrapper = document.querySelector('.wrapper');
  const categoryBtn = document.querySelector('.categoryBtn');

  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
      const results = data.categories;

      categoryBtn.addEventListener('click', function handleCategoryBtnClick() {
        
        // Remove the event listener after the first click
       

       
      });
    })
    
});
