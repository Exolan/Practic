import { updateMain } from "./updateMain.js";

let fioSortCheck = 0;
let idSortCheck = 0;
let creationDateSort = 0;
let changeDateSort = 0;

let fio = document.querySelector(".fio");
let id = document.querySelector(".id");
let reg = document.querySelector(".dateReg");
let change = document.querySelector(".dateChange");

fio.addEventListener("click", () => {
  sortByFio();
});

id.addEventListener("click", () => {
  sortById();
});

reg.addEventListener("click", () => {
  sortByCreationDate();
});

change.addEventListener("click", () => {
  sortByChangeDate();
});

function sortByFio() {
  let array = JSON.parse(localStorage.getItem("clients"));
  let img = fio.querySelector("img");
  let text = fio.querySelector(".table-sort");
  if (fioSortCheck == 0) {
    img.src = "./Resurce/TABLE/ICON/UP.svg";
    text.textContent = "A-Я";
    fioSortCheck += 1;
    array.sort((a, b) => {
      if (a.fio > b.fio) {
        return 1;
      }
      if (a.fio < b.fio) {
        return -1;
      }
      return 0;
    });
  } else {
    img.src = "./Resurce/TABLE/ICON/DOWN.svg";
    fioSortCheck = 0;
    text.textContent = "Я-А";
    array.sort((a, b) => {
      if (a.fio < b.fio) {
        return 1;
      }
      if (a.fio > b.fio) {
        return -1;
      }
      return 0;
    });
  }
  localStorage.setItem("clients", JSON.stringify(array));
  updateMain();
}

function sortById() {
  let array = JSON.parse(localStorage.getItem("clients"));
  let img = id.querySelector("img");
  if (idSortCheck == 0) {
    img.src = "./Resurce/TABLE/ICON/UP.svg";
    idSortCheck += 1;
    array.sort((a, b) => {
      return a.id - b.id;
    });
  } else {
    img.src = "./Resurce/TABLE/ICON/DOWN.svg";
    idSortCheck = 0;
    array.sort((a, b) => {
      return b.id - a.id;
    });
  }
  localStorage.setItem("clients", JSON.stringify(array));
  updateMain();
}
sortById();

function sortByCreationDate() {
  let array = JSON.parse(localStorage.getItem("clients"));
  let img = reg.querySelector("img");
  if (creationDateSort == 0) {
    img.src = "./Resurce/TABLE/ICON/UP.svg";
    creationDateSort += 1;
    array.sort((a, b) => {
      if (a.dateReg > b.dateReg) {
        return 1;
      }
      if (a.dateReg < b.dateReg) {
        return -1;
      }
      return 0;
    });
  } else {
    img.src = "./Resurce/TABLE/ICON/DOWN.svg";
    creationDateSort = 0;
    array.sort((a, b) => {
      if (a.dateReg > b.dateReg) {
        return -1;
      }
      if (a.dateReg < b.dateReg) {
        return 1;
      }
      return 0;
    });
  }
  localStorage.setItem("clients", JSON.stringify(array));
  updateMain();
}

function sortByChangeDate() {
  let array = JSON.parse(localStorage.getItem("clients"));
  let img = change.querySelector("img");
  if (changeDateSort == 0) {
    img.src = "./Resurce/TABLE/ICON/UP.svg";
    changeDateSort += 1;
    array.sort((a, b) => {
      if (a.dateChange > b.dateChange) {
        return 1;
      }
      if (a.dateChange < b.dateChange) {
        return -1;
      }
      return 0;
    });
  } else {
    img.src = "./Resurce/TABLE/ICON/DOWN.svg";
    changeDateSort = 0;
    array.sort((a, b) => {
      if (a.dateChange > b.dateChange) {
        return -1;
      }
      if (a.dateChange < b.dateChange) {
        return 1;
      }
      return 0;
    });
  }
  localStorage.setItem("clients", JSON.stringify(array));
  updateMain();
}
