import { updateMain } from "./updateMain.js";

export function buttonDelete() {
  const buttonsDelete = document.querySelectorAll(".delete");
  const modalDelete = document.querySelector(".modal-delete");
  const buttonClose = modalDelete.querySelector(".modal-close");
  const buttonDelete = modalDelete.querySelector(".del");
  const cancleDelete = modalDelete.querySelector(".cancle");
  let clientsArray = JSON.parse(localStorage.getItem("clients"));
  let id = 0;

  for (let i = 0; i < buttonsDelete.length; i++) {
    buttonsDelete[i].addEventListener("click", () => {
      modalDelete.style.display = "flex";
      id = i;
    });
  }

  buttonClose.addEventListener("click", () => {
    modalDelete.style.display = "none";
  });

  modalDelete.addEventListener("click", (e) => {
    const isModal = e.target.closest(".modal-conteiner");
    if (!isModal) {
      modalDelete.style.display = "none";
    }
  });

  buttonDelete.addEventListener("click", () => {
    clientsArray.splice(id, 1);
    localStorage.setItem("clients", JSON.stringify(clientsArray));
    updateMain();
    modalDelete.style.display = "none";
  });

  cancleDelete.addEventListener("click", () => {
    modalDelete.style.display = "none";
  });
}
