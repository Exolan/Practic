const buttonsDelete = document.querySelectorAll(".delete");
const tr = document.querySelectorAll(".table-body-row");

for (let i = 0; i < buttonsDelete.length; i++) {
  buttonsDelete[i].addEventListener("click", () => {
    tr[i].remove();
  });
}
