const modal = document.querySelector(".modal-auth");
const buttonAuth = document.querySelector(".button-auth");
const buttonOut = document.querySelector(".button-out");
const close = document.querySelector(".close-auth");
const buttonLogin = document.querySelector(".button-login");
const userName = document.querySelector(".user-name");

const userObj = [
  { login: "andrew", password: "slim" },
  { login: "leha", password: "lis" },
  { login: "anton", password: "jurakov" },
  { login: "geniy", password: "bach" },
];

if (JSON.parse(localStorage.getItem("user")) != null) {
  modal.style.display = "none";
  userName.style.display = "flex";
  userName.textContent = JSON.parse(localStorage.getItem("user"));
  buttonOut.style.display = "flex";
  buttonAuth.style.display = "none";
}

buttonAuth.addEventListener("click", () => {
  modal.style.display = "flex";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  const isModal = e.target.closest(".modal-dialog-auth");

  if (!isModal) {
    modal.style.display = "none";
  }
});

modal.addEventListener("submit", (e) => {
  e.preventDefault();
  const login = modal.querySelector("#login");
  const password = modal.querySelector("#password");
  if (login.value != "" && password.value != "") {
    for (let user of userObj) {
      if (login.value == user.login && password.value == user.password) {
        localStorage.setItem("user", JSON.stringify(login.value));
        modal.style.display = "none";
        userName.style.display = "flex";
        userName.textContent = login.value;
        buttonOut.style.display = "flex";
        buttonAuth.style.display = "none";
        return;
      }
    }
    alert("Неверный логин или пароль");
  } else {
    if (login.value == "" && password.value == "") {
      alert("Вы не заполнили оба поля");
    } else if (password.value == "") {
      alert("Вы не заполнили поле: Пароль");
    } else {
      alert("Вы не заполнили поле: Логин");
    }
  }
});

buttonOut.addEventListener("click", () => {
  if (confirm("Вы точно хотите выйти?")) {
    localStorage.setItem("user", JSON.stringify(null));
    userName.style.display = "none";
    userName.textContent = "";
    buttonOut.style.display = "none";
    buttonAuth.style.display = "flex";
  }
});
