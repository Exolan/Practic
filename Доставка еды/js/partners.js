fetch("https://test-f489c-default-rtdb.firebaseio.com/db/partners.json")
  .then((responce) => responce.json())
  .then((data) => renderItems(data))
  .catch((error) => {
    console.log(error);
  });

const renderItems = (data) => {
  const array = data;
  const cardRestaurants = document.querySelector(".cards-restaurants");
  array.forEach((restaurant) => {
    const a = document.createElement("a");
    a.href = `restaurant.html`;
    a.className = "card card-restaurant";
    a.innerHTML = `<img src="${restaurant.image}" alt="image" class="card-image"/>
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title">${restaurant.name}</h3>
                  <span class="card-tag tag">${restaurant.time_of_delivery} мин</span>
                </div>
                <div class="card-info">
                  <div class="rating">${restaurant.stars}</div>
                  <div class="price">${restaurant.price}</div>
                  <div class="category">${restaurant.kitchen}</div>
                </div>
              </div>
            </a>`;
    a.addEventListener("click", () => {
      localStorage.setItem("menu", JSON.stringify(restaurant.products));
      localStorage.setItem("restaurant", JSON.stringify(restaurant));
    });
    cardRestaurants.append(a);
  });
};
