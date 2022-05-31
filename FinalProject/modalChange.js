const modalChange = document.querySelector(".modal-change");
const closeButtonModal = modalChange.querySelector(".modal-close");
const buttons = document.querySelectorAll(".change");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    modalChange.style.display = "flex";

    closeButtonModal.addEventListener("click", () => {
      modalChange.style.display = "none";
    });

    modalChange.addEventListener("click", (e) => {
      const isModal = e.target.closest(".modal-conteiner");
      const divCont = e.target.closest(".block");
      if (!isModal && !divCont) {
        modalChange.style.display = "none";
      }
    });
  });
}
