const buttonsChange = document.querySelectorAll(".change");

for (let i = 0; i < buttonsChange.length; i++) {
  buttonsChange[i].addEventListener("click", () => {
    const modal = document.querySelector(".modal-change");
    const closeButton = modal.querySelector(".modal-close");
    const inputes = modal
      .querySelector(".modal-inputes")
      .querySelectorAll("input");
    const clientArray = JSON.parse(localStorage.getItem("clients"));
    const fio = clientArray[i].fio.split(" ");
    console.log(fio);

    modal.style.display = "flex";

    for (let j = 0; j < inputes.length; j++) {
      inputes[j].value = fio[j];
    }

    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      const isModal = e.target.closest(".modal-conteiner");
      const divCont = e.target.closest(".block");
      if (!isModal && !divCont) {
        modal.style.display = "none";
      }
    });
  });
}
