import { updateMain } from "./updateMain.js";

const table = document.querySelector(".main-table");
const array = JSON.parse(localStorage.getItem("clients"));

function filtration(table, array) {
  const input = document.querySelector(".header-input");
  let status = true;
  input.addEventListener("input", () => {
    setInterval(() => {
      if (input.value == "") {
        status = false;
      } else {
        status = true;
      }
      if (status) {
        makeFilter(input, array);
      } else {
        updateMain();
      }
    }, 1000);
  });
}

function makeFilter(input, array) {
  const tbody = document.querySelector("tbody");
  const rows = document.querySelectorAll(".table-body-row");
  console.log(tbody);
  console.log(rows);
  const newRows = [];

  for (let i = 0; i < array.length; i++) {
    if (String(array[i].fio).includes(input.value) == true) {
      newRows.push(array[i]);
    }
  }

  [].forEach.call(rows, (row) => {
    tbody.removeChild(row);
  });

  newRows.forEach((newRow) => {
    const tr = document.createElement("tr");
    tr.className = "table-body-row";
    tr.innerHTML = `<td class="body-item">
                        <p class="text1">${newRow.id}</p>
                    </td>
                    <td class="body-item">
                        <p class="text2">${newRow.fio}</p>
                    </td>
                    <td class="body-item">
                        <p class="text2">${addZero(
                          new Date(newRow.dateReg).getDay()
                        )}.${addZero(
      new Date(newRow.dateReg).getMonth()
    )}.${new Date(newRow.dateReg).getFullYear()}</p>
                        <p class="time text1">${addZero(
                          new Date(newRow.dateReg).getHours()
                        )}:${addZero(new Date(newRow.dateReg).getMinutes())}</p>
                    </td>
                    <td class="body-item">
                        <p class="text2">${addZero(
                          new Date(newRow.dateChange).getDay()
                        )}.${addZero(
      new Date(newRow.dateChange).getMonth()
    )}.${addZero(new Date(newRow.dateChange).getFullYear())}</p>
                        <p class="time text1">${addZero(
                          new Date(newRow.dateChange).getHours()
                        )}:${addZero(
      new Date(newRow.dateChange).getMinutes()
    )}</p>
                    </td>
                    <td class="body-item">
                        ${viewContacts(newRow)}
                    </td>
                    <td class="body-item change">
                        <img src="/Resurce/TABLE/ICON/edit.svg" alt="" class="icon">
                        <p class="text2">Изменить</p>
                    </td>
                    <td class="body-item delete">
                        <img src="/Resurce/TABLE/ICON/cancel.svg" alt="" class="icon">
                        <p class="text2">Удалить</p>
                    </td>`;
    tbody.append(tr);
  });
}

filtration(table, array);

function viewContacts(client) {
  const arrayContacts = client.contacts;
  let string = "";
  arrayContacts.forEach((contact) => {
    string += `<img src=${contact.icon} alt="" class="icon" title=${contact.text}>`;
  });
  return string;
}

function addZero(num) {
  if (num >= 0 && num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
}
