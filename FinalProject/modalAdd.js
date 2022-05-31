const button = document.querySelector(".footer-button");
const modalAdd = document.querySelector(".modal-add");
const buttonSave = modalAdd.querySelector(".save-client");
const closeButton = modalAdd.querySelector(".modal-close");
const modalContacts = modalAdd.querySelector(".modal-contacts");
const buttonContact = modalContacts.querySelector(".button-client");
const footer = modalAdd.querySelector(".modal-footer");
const buttonCancle = modalAdd.querySelector(".delete-client");

function deleteContact() {
  const blocks = document.querySelectorAll(".block");
  const buttons = document.querySelectorAll(".contact-cancle");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      blocks[i].remove();
    });
  }
}

buttonCancle.addEventListener("click", () => {
  const inputs = modalAdd.querySelectorAll("input");
  const blocks = modalAdd.querySelectorAll(".block");
  inputs.forEach((input) => {
    input.value = "";
  });
  blocks.forEach((block) => {
    block.remove();
  });
});

//Открытие окна
button.addEventListener("click", () => {
  modalAdd.style.display = "flex";

  closeButton.addEventListener("click", () => {
    modalAdd.style.display = "none";
  });

  modalAdd.addEventListener("click", (e) => {
    const isModal = e.target.closest(".modal-conteiner");
    const divCont = e.target.closest(".block");
    if (!isModal && !divCont) {
      modalAdd.style.display = "none";
    }
  });
});

//Кнопка контактов
buttonContact.addEventListener("click", () => {
  const contacts = modalAdd.querySelector(".contacts");
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
});

//Сохранение
buttonSave.addEventListener("click", () => {
  const modalInputes = modalAdd.querySelector(".modal-inputes");
  const inputs = modalInputes.querySelectorAll("input");
  const blocks = modalAdd.querySelectorAll(".block");
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
    if (contact.value == "Телефон" || contact.value == "Доп. телефон") {
      icon = "/Resurce/TABLE/ICON/phone.svg";
    } else if (contact.value == "Email") {
      icon = "/Resurce/TABLE/ICON/mail.svg";
    } else if (contact.value == "Vk") {
      icon = "/Resurce/TABLE/ICON/vk.svg";
    } else if (contact.value == "Facebook") {
      icon = "/Resurce/TABLE/ICON/fb.svg";
    }

    contacts.push({
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
    pushClient(1, fio, contacts);
    alert("Добавлен");
    inputs.forEach((input) => {
      input.value = "";
    });
  }
});

//Пуш клиентов
function pushClient(id, fio, contacts = []) {
  const clientArray = JSON.parse(localStorage.getItem("clients")) || [];
  clientArray.push({
    id: id,
    fio: `${fio}`,
    dateReg: new Date(),
    dateChange: new Date(),
    contacts: contacts,
  });
  localStorage.setItem("clients", JSON.stringify(clientArray));
}
