import { updateMain } from "./updateMain.js";

export function modalChange() {
  const buttonsChange = document.querySelectorAll(".change");
  let id = 0;
  const clientArray = JSON.parse(localStorage.getItem("clients"));
  const modal = document.querySelector(".modal-change");
  const buttonSave = modal.querySelector(".save-client");
  const modalContacts = modal.querySelector(".modal-contacts");
  const buttonContact = modalContacts.querySelector(".button-client");
  const buttonDel = modal.querySelector(".delete-client");
  let clientsArray = JSON.parse(localStorage.getItem("clients"));

  for (let i = 0; i < buttonsChange.length; i++) {
    buttonsChange[i].addEventListener("click", () => {
      const contacts = modal.querySelectorAll(".block");
      let modalId = document.querySelector(".modal-text");
      modalId.textContent = `ID: ${clientArray[i].id}`;
      contacts.forEach((block) => {
        block.remove();
      });
      const closeButton = modal.querySelector(".modal-close");
      const inputes = modal
        .querySelector(".modal-inputes")
        .querySelectorAll("input");
      const fio = clientArray[i].fio.split(" ");
      id = i;
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

      const contactsClient = clientArray[id].contacts;
      for (let i = 0; i < contactsClient.length; i++) {
        const contacts = modal.querySelector(".contacts");
        const block = document.createElement("div");
        block.className = "block";
        block.innerHTML = `<div class="block-contact">
                                <select class='contact-select'> 
                                    ${checkCont(contactsClient[i])}
                                </select>
                            </div>
                            
                            <input type="tel" placeholder="Введите данные контакта" value=${
                              contactsClient[i].text
                            }>
                            <div class="contact-cancle">
                                <img src="/Resurce/MODAL/cancel.svg" alt="" class="contact-icon">
                            </div>`;
        contacts.append(block);

        deleteContact();
      }
    });
  }

  buttonDel.onclick = () => {
    const modalDelete = document.querySelector(".modal-delete");
    const buttonClose = modalDelete.querySelector(".modal-close");
    const buttonDelete = modalDelete.querySelector(".del");
    const cancleDelete = modalDelete.querySelector(".cancle");
    const modalInputes = modal.querySelector(".modal-inputes");
    const inputs = modalInputes.querySelectorAll("input");
    const inpCon = modalContacts.querySelectorAll("input");

    modalDelete.style.display = "flex";

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
      inputs.forEach((input) => {
        input.value = "";
      });

      inpCon.forEach((input) => {
        input.value = "";
      });
      modalDelete.style.display = "none";
    });

    cancleDelete.addEventListener("click", () => {
      modalDelete.style.display = "none";
    });
  };

  buttonSave.onclick = () => {
    const modalInputes = modal.querySelector(".modal-inputes");
    const inputs = modalInputes.querySelectorAll("input");
    const blocks = modal.querySelectorAll(".block");

    let statusError = false;
    let errors = "";
    let contacts = [];

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "" && i == 0) {
        statusError = true;
        errors += "Введите фамилию! ";
      }
      if (inputs[i].value == "" && i == 1) {
        statusError = true;
        errors += "Введите имя! ";
      }
    }
    for (let i = 0; i < blocks.length; i++) {
      const input = blocks[i].querySelector("input");
      const contact = blocks[i].querySelector("select");

      let icon = "";
      let name = "";
      if (contact.value == "Телефон") {
        icon = "/Resurce/TABLE/ICON/phone.svg";
        name = "ph";
      } else if (contact.value == "Доп. телефон") {
        icon = "/Resurce/TABLE/ICON/phone.svg";
        name = "dph";
      } else if (contact.value == "Email") {
        name = "mail";
        icon = "/Resurce/TABLE/ICON/mail.svg";
      } else if (contact.value == "Vk") {
        icon = "/Resurce/TABLE/ICON/vk.svg";
        name = "vk";
      } else if (contact.value == "Facebook") {
        icon = "/Resurce/TABLE/ICON/fb.svg";
        name = "fb";
      }

      contacts.push({
        name: name,
        icon: icon,
        text: input.value,
      });
    }

    if (statusError == true) {
      alert(`${errors}`);
    } else {
      let fio = "";

      inputs.forEach((input) => {
        fio += `${input.value} `;
      });

      rewriteClient(id, fio, contacts);

      alert("Добавлен");
      updateMain();
      // inputs.forEach((input) => {
      //   input.value = "";
      // });

      // inpCon.forEach((input) => {
      //   input.value = "";
      // });
    }
  };
  buttonContact.onclick = () => {
    const contacts = modal.querySelector(".contacts");
    const block = document.createElement("div");
    block.className = "block";
    block.innerHTML = `<div class="block-contact">
                                <select class='contact-select'> 
                                    <option>Телефон</option>
                                    <option>Доп. телефон</option>
                                    <option>Email</option>
                                    <option>Vk</option>
                                    <option>Facebook</option>
                                </select>
                            </div>
                            
                            <input type="tel" placeholder="Введите данные контакта">
                            <div class="contact-cancle">
                                <img src="/Resurce/MODAL/cancel.svg" alt="" class="contact-icon">
                            </div>`;
    contacts.append(block);

    deleteContact();
  };

  //Пуш клиентов
  function rewriteClient(id, fio, contacts = []) {
    const clientArray = JSON.parse(localStorage.getItem("clients")) || [];
    clientArray[id].fio = fio;
    clientArray[id].contacts = contacts;
    clientArray[id].dateChange = new Date();
    localStorage.setItem("clients", JSON.stringify(clientArray));
  }

  function checkCont(cont) {
    if (cont.name == "ph") {
      return `<option selected>Телефон</option>
                                    <option>Доп. телефон</option>
                                    <option>Email</option>
                                    <option>Vk</option>
                                    <option>Facebook</option>`;
    } else if (cont.name == "dph") {
      return `<option>Телефон</option>
                                    <option selected>Доп. телефон</option>
                                    <option>Email</option>
                                    <option>Vk</option>
                                    <option>Facebook</option>`;
    } else if (cont.name == "mail") {
      return `<option>Телефон</option>
                                    <option>Доп. телефон</option>
                                    <option selected>Email</option>
                                    <option>Vk</option>
                                    <option>Facebook</option>`;
    } else if (cont.name == "vk") {
      return `<option>Телефон</option>
                                    <option>Доп. телефон</option>
                                    <option>Email</option>
                                    <option selected>Vk</option>
                                    <option>Facebook</option>`;
    } else if (cont.name == "fb") {
      return `<option>Телефон</option>
                                    <option>Доп. телефон</option>
                                    <option>Email</option>
                                    <option>Vk</option>
                                    <option selected>Facebook</option>`;
    }
  }

  function deleteContact() {
    const blocks = document.querySelectorAll(".block");
    const buttons = document.querySelectorAll(".contact-cancle");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", () => {
        blocks[i].remove();
      });
    }
  }
}
