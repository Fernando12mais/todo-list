import { getTheme, setTheme } from "./theme";
import { createTask, loadTasks } from "./todo-functions";

const todoContainer = document.querySelector("#todo-items");
const input = document.querySelector("#input");
const form = document.querySelector("#form");
const inputContainer = document.querySelector("#input-container");
const btnTheme = document.querySelector("#btn-theme");
let items = [];
setTheme();

btnTheme.onclick = () => {
  const theme = getTheme();

  if (theme == "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
};

window.onload = () => {
  loadTasks({ container: todoContainer, items });
};

input.onfocus = () => {
  const error = document.querySelector("#error");

  if (error) {
    error.classList.add("fade-out");
    error.onanimationend = () => {
      error.remove();
    };
  }
};

form.onsubmit = (event) => {
  event.preventDefault();
  if (!input.value.trim()) {
    const error = document.createElement("span");
    error.id = "error";
    error.append("What is the name of your task?");

    inputContainer.append(error);
    error.classList.add("fade-in");
    return;
  }
  const id = Math.random();

  createTask({
    id,
    value: input.value,
    container: todoContainer,
    items,
  });

  input.value = "";
};

function loadItems(items) {
  items.forEach(({ id, item }) =>
    createTask({ id, items, container: todoContainer, value: item })
  );
}
