fetch(
  `https://test-f489c-default-rtdb.firebaseio.com/db/${JSON.parse(
    localStorage.getItem("menu")
  )}`
)
  .then((responce) => responce.json())
  .then((data) => renderItems(data))
  .catch((error) => {
    console.log(error);
  });

function addCurt(name, price) {
  const modalBody = document.querySelector(".modal-body");
  let array = JSON.parse(localStorage.getItem("curt")) || [];
  let obj = {
    name: name,
    price: price,
    count: 1,
  };
  array.push(obj);
  localStorage.setItem("curt", JSON.stringify(array));
}

const renderItems = (data) => {
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));
  const menuArray = data;
  const menu = document.querySelector(".menu");
  const sectionHeading = document.createElement("div");
  const cardsMenu = document.createElement("div");

  sectionHeading.className = "section-heading";
  sectionHeading.innerHTML = `<h2 class="section-title restaurant-title">${restaurant.name}</h2>
            <div class="card-info">
              <div class="rating">${restaurant.stars}</div>
              <div class="price">От ${restaurant.price} ₽</div>
              <div class="category">${restaurant.kitchen}</div>
            </div>`;

  cardsMenu.className = "cards cards-menu";

  for (const item of menuArray) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src='${item.image}' alt="image" class="card-image"/>
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title card-title-reg">${item.name}</h3>
                </div>
                <div class="card-info">
                  <div class="ingredients">
                    ${item.description}
                  </div>
                </div>
                <div class="card-buttons">
                  <button class="button button-primary button-add-cart" onclick="addCurt('${item.name}', '${item.price}')">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                  </button>
                  <strong class="card-price-bold">${item.price} ₽</strong>
                </div>
              </div>`;
    cardsMenu.append(card);
  }

  menu.append(sectionHeading);
  menu.append(cardsMenu);
};
