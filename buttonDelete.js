const buttonsDelete = document.querySelectorAll(".delete");
const tr = document.querySelectorAll(".table-body-row");

for (let i = 0; i < buttonsDelete.length; i++) {
  buttonsDelete[i].addEventListener("click", () => {
    const modalDelete = document.querySelector(".modal-delete");
    const deleteClient = modalDelete.querySelector(".delete-client");
    let clientArray = JSON.parse(localStorage.getItem("clients"));

    modalDelete.style.display = "flex";

    deleteClient.addEventListener("click", () => {
      tr[i].remove();
    });
  });
}
