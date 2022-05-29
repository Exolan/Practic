function mcart() {
  const buttonCart = document.querySelector(".button-cart");
  const modalCart = document.querySelector(".modal-cart");
  const closeCart = modalCart.querySelector(".close");
  const modalBody = document.querySelector(".modal-body");
  const finalPrice = modalCart.querySelector(".modal-pricetag");
  const buttonClear = modalCart.querySelector(".clear-cart");
  const buttonPrimary = modalCart.querySelector(".button-primary");
  let arrayCurt = [];

  buttonCart.addEventListener("click", () => {
    modalCart.style.display = "flex";
    arrayCurt = JSON.parse(localStorage.getItem("curt"));
    loadCart(modalBody, arrayCurt, finalPrice);
  });

  closeCart.addEventListener("click", () => {
    modalCart.style.display = "none";
  });

  modalCart.addEventListener("click", (e) => {
    const isModal = e.target.closest(".modal-dialog");

    if (!isModal) {
      modalCart.style.display = "none";
    }
  });

  buttonPrimary.addEventListener("click", () => {
    if (arrayCurt.length != 0) {
      if (confirm("Вы точно хотите оформить заказ?")) {
        modalCart.style.display = "none";
        alert("Спасибо за заказ!");
      }
    } else {
      alert("Корзина пуста!");
    }
  });

  buttonClear.addEventListener("click", () => {
    if (arrayCurt.length != 0) {
      if (confirm("Вы точно хотите удалить товар из корзины?")) {
        modalCart.querySelectorAll(".food-row").forEach((food) => {
          food.remove();
        });
        arrayCurt = [];
        localStorage.setItem("curt", JSON.stringify(arrayCurt));
        finalPrice.textContent = "0 ₽";
      }
    } else {
      alert("Корзина пуста!");
    }
  });
}

function loadCart(modalBody, arrayCurt, finalPrice) {
  let foods = modalBody.querySelectorAll(".food-row");
  if (foods.length != 0) {
    foods.forEach((food) => {
      food.remove();
    });
  }

  let arrayFood = [];
  if (arrayCurt.length != 0) {
    for (let index = 0; index < arrayCurt.length; index++) {
      const foodRow = document.createElement("div");
      foodRow.className = "food-row";
      foodRow.innerHTML = `<span class="food-name">${
        arrayCurt[index].name
      }</span>
            <strong class="food-price">${
              arrayCurt[index].price * arrayCurt[index].count
            } ₽</strong>
            <div class="food-counter">
              <button class="counter-button">-</button>
              <span class="counter">${arrayCurt[index].count}</span>
              <button class="counter-button">+</button>
            </div>`;
      modalBody.append(foodRow);
      arrayFood.push(foodRow);
    }
  }

  function checkPrice(finalPrice) {
    finalPrice.textContent = "0";
    arrayCurt.forEach((food) => {
      finalPrice.textContent = `${
        parseInt(finalPrice.textContent) + food.price * food.count
      } ₽`;
    });
  }
  checkPrice(finalPrice);

  if (arrayFood.length != 0) {
    for (let food = 0; food < arrayFood.length; food++) {
      const buttons = arrayFood[food].querySelectorAll(".counter-button");
      const count = arrayFood[food].querySelector(".counter");
      const foodPrice = arrayFood[food].querySelector(".food-price");
      for (let button = 0; button < buttons.length; button++) {
        buttons[button].addEventListener("click", () => {
          if (buttons[button].textContent == "+") {
            count.textContent = parseInt(count.textContent) + 1;
            foodPrice.textContent = `${
              arrayCurt[food].price * parseInt(count.textContent)
            } ₽`;
            arrayCurt[food].count = parseInt(count.textContent);
          } else {
            if (count.textContent != 0) {
              count.textContent = parseInt(count.textContent) - 1;
              foodPrice.textContent = `${
                parseInt(foodPrice.textContent) - arrayCurt[food].price
              } ₽`;
            } else {
              foodPrice.textContent = "0 ₽";
            }
            arrayCurt[food].count = parseInt(count.textContent);
          }
          checkPrice(finalPrice);
          localStorage.setItem("curt", JSON.stringify(arrayCurt));
        });
      }
    }
  }
}

mcart();

// unique([1, 2, 2, 4, 5, 2, 1, 7]);
// function unique(array) {
//   let firstArray = array;
//   let uniqueArray = [];
//   let arrayCheckIndex = [];
//   for (let i = 0; i < firstArray.length; i++) {
//     for (let k = 0; k < arrayCheckIndex.length; k++) {
//       if (i != arrayCheckIndex[k]) {
//         for (let j = i + 1; j < firstArray.length - 1; j++) {
//           if (firstArray[i].name == firstArray[j].name) {
//             firstArray[i].count += 1;
//             arrayCheckIndex.push(j);
//           }
//           uniqueArray.push(firstArray[i]);
//         }
//       }
//     }
//   }
//   console.log(uniqueArray);
// }

// function cart() {
//   const modalBody = document.querySelector(".modal-body");
//   const modalCart = document.querySelector(".modal-cart");
//   const buttonCart = document.querySelector(".button-cart");

//   buttonCart.addEventListener("click", () => {
//     modalCart.style.display = "flex";
//     loadCart(modalBody);
//   });

//   const closeCart = modalCart.querySelector(".close");
//   const finalPrice = modalCart.querySelector(".modal-pricetag");
//   const buttonPrimary = modalCart.querySelector(".button-primary");
//   const buttonClear = modalCart.querySelector(".clear-cart");
//   const foodPrices = modalCart.querySelectorAll(".food-price");
//   const foodCounters = modalCart.querySelectorAll(".food-counter");
//   let foods = modalBody.querySelectorAll(".food-row");

//   closeCart.addEventListener("click", () => {
//     modalCart.style.display = "none";
//   });

//   modalCart.addEventListener("click", (e) => {
//     const isModal = e.target.closest(".modal-dialog");

//     if (!isModal) {
//       modalCart.style.display = "none";
//     }
//   });

//   foodPrices.forEach((price) => {
//     finalPrice.textContent =
//       parseInt(finalPrice.textContent) + parseInt(price.textContent) + " ₽";
//   });

//   buttonPrimary.addEventListener("click", () => {
//     if (foods.length != 0) {
//       if (confirm("Вы точно хотите оформить заказ?")) {
//         modalCart.style.display = "none";
//         alert("Спасибо за заказ!");
//       }
//     } else {
//       alert("Корзина пуста!");
//     }
//   });

//   buttonClear.addEventListener("click", () => {
//     if (foods.length != 0) {
//       if (confirm("Вы точно хотите удалить товар из корзины?")) {
//         foods.forEach((food) => {
//           food.remove();
//         });
//         foods = [];
//         localStorage.setItem("curt", JSON.stringify(foods));
//         finalPrice.textContent = "0 ₽";
//       }
//     } else {
//       alert("Корзина пуста!");
//     }
//   });

//   for (let counter = 0; counter < foodCounters.length; counter++) {
//     console.log(foodCounters[counter]);
//     foodCounters[counter].addEventListener("click", (e) => {
//       const btnClick = e.target.closest(".counter-button");
//       const count = foodCounters[counter].querySelector(".counter");
//       const foodPrices = modalCart.querySelectorAll(".food-price");
//       if (!e.target.classList.contains("counter-button")) return;
//       if (btnClick.textContent == "+") {
//         count.textContent = parseInt(count.textContent) + 1;
//         foodPrices[counter].textContent =
//           parseInt(localArray[counter].price) * parseInt(count.textContent) +
//           " ₽";
//       } else if (btnClick.textContent == "-") {
//         if (count.textContent != 0) {
//           foodPrices[counter].textContent =
//             parseInt(foodPrices[counter].textContent) -
//             parseInt(localArray[counter].price) +
//             " ₽";
//           count.textContent = parseInt(count.textContent) - 1;
//         } else {
//           foodPrices[counter].textContent = "0 ₽";
//         }
//       }
//       finalPrice.textContent = "0";
//       foodPrices.forEach((price) => {
//         finalPrice.textContent =
//           parseInt(finalPrice.textContent) + parseInt(price.textContent) + " ₽";
//       });
//     });
//   }
// }
