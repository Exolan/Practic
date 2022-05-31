const tbody = document.querySelector("tbody");
const clientArray = JSON.parse(localStorage.getItem("clients")) || [];

clientArray.forEach((client) => {
  const tr = document.createElement("tr");
  tr.className = "table-body-row";
  tr.innerHTML = `<td class="body-item">
                        <p class="text1">1</p>
                    </td>
                    <td class="body-item">
                        <p class="text2">${client.fio}</p>
                    </td>
                    <td class="body-item">
                        <p class="text2">${new Date(
                          client.dateReg
                        ).getDay()}.${new Date(
    client.dateReg
  ).getMonth()}.${new Date(client.dateReg).getFullYear()}</p>
                        <p class="time text1">${new Date(
                          client.dateReg
                        ).getHours()}:${new Date(
    client.dateReg
  ).getMinutes()}</p>
                    </td>
                    <td class="body-item">
                        <p class="text2">${new Date(
                          client.dateChange
                        ).getDay()}.${new Date(
    client.dateChange
  ).getMonth()}.${new Date(client.dateChange).getFullYear()}</p>
                        <p class="time text1">${new Date(
                          client.dateChange
                        ).getHours()}:${new Date(
    client.dateChange
  ).getMinutes()}</p>
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
});

function viewContacts(client) {
  const arrayContacts = client.contacts;
  console.log(client.contacts);
  let string = "";
  arrayContacts.forEach((contact) => {
    string += `<img src=${contact.icon} alt="" class="icon" title=${contact.text}>`;
  });
  return string;
}
