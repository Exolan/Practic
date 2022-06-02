import { buttonDelete } from "./buttonDelete.js";
import { modalChange } from "./modalChange.js";

export function updateMain() {
  const tbody = document.querySelector("tbody");
  const clientArray = JSON.parse(localStorage.getItem("clients")) || [];
  localStorage.setItem("clients", JSON.stringify(clientArray));
  tbody.innerHTML = "";

  clientArray.forEach((client) => {
    const tr = document.createElement("tr");
    tr.className = "table-body-row";
    tr.innerHTML = `<td class="body-item">
                        <p class="text1">${client.id}</p>
                    </td>
                    <td class="body-item">
                        <p class="text2">${client.fio}</p>
                    </td>
                    <td class="body-item">
                        <p class="text2">${addZero(
                          new Date(client.dateReg).getDay()
                        )}.${addZero(
      new Date(client.dateReg).getMonth()
    )}.${new Date(client.dateReg).getFullYear()}</p>
                        <p class="time text1">${addZero(
                          new Date(client.dateReg).getHours()
                        )}:${addZero(new Date(client.dateReg).getMinutes())}</p>
                    </td>
                    <td class="body-item">
                        <p class="text2">${addZero(
                          new Date(client.dateChange).getDay()
                        )}.${addZero(
      new Date(client.dateChange).getMonth()
    )}.${addZero(new Date(client.dateChange).getFullYear())}</p>
                        <p class="time text1">${addZero(
                          new Date(client.dateChange).getHours()
                        )}:${addZero(
      new Date(client.dateChange).getMinutes()
    )}</p>
                    </td>
                    <td class="body-item">
                        ${viewContacts(client)}
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
  });
  modalChange();
  buttonDelete();
}
