//ModalWindow
const modalWindow = document.querySelector(".modal");
const modalButton = document.querySelectorAll(".modal_button");
const modalClose = document.querySelector(".modal_close");

for (index of modalButton) {
  index.addEventListener("click", () => {
    modalWindow.style.display = "flex";
  });
}
modalClose.addEventListener("click", () => {
  modalWindow.style.display = "none";
});
modalWindow.addEventListener("click", (e) => {
  const isModal = e.target.closest(".modal_inner");

  if (!isModal) {
    modalWindow.style.display = "none";
  }
});

//Timer
const timer = document.querySelectorAll(".timer_count");
console.log(new Date().getHours());
setInterval(() => {
  timer[1].textContent = parseInt(new Date().getHours());
  timer[2].textContent = parseInt(new Date().getMinutes());
  timer[3].textContent = parseInt(new Date().getSeconds());
});
