import { getTheme, setTheme } from "./theme";

const todoContainer = document.querySelector("#todo-items");
const input = document.querySelector("#input");
const form = document.querySelector("#form");
const inputContainer = document.querySelector("#input-container");
const btnTheme = document.querySelector("#btn-theme");

setTheme();

btnTheme.onclick = () => {
  const theme = getTheme();

  if (theme == "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
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

let items = [];

window.onload = () => {
  const persistedItems = JSON.parse(localStorage.getItem("items"));

  if (persistedItems) {
    items = persistedItems;
    loadItems(items);
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
  items.push({ id, item: input.value, isDone: false });
  generateItem({ id, inputValue: input.value });
};

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
}

function generateItem({ id, inputValue }) {
  const li = document.createElement("li");
  li.classList.add("item");
  li.classList.add("fade-in");

  const task = document.createElement("input");
  task.value = inputValue;
  task.readOnly = true;
  task.onfocus = () => {
    task.readOnly = false;
  };
  task.onblur = () => {
    task.readOnly = true;
  };

  task.onchange = (event) => {
    items.forEach((item) => {
      if (item.id == id) {
        item.item = event.target.value;
        updateLocalStorage();
      }
    });
  };

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-delete");
  btnDelete.append("Delete");
  btnDelete.type = "button";
  btnDelete.onclick = () => {
    deleteItem(id);
    updateLocalStorage();

    li.classList.replace("fade-in", "fade-out");
    li.onanimationend = () => {
      li.remove();
    };
  };

  const btnDone = document.createElement("input");

  btnDone.type = "checkbox";
  btnDone.classList.add("btn-done");

  btnDone.onclick = () => {
    const todoItem = items.find((item) => item.id == id);
    todoItem.isDone = !todoItem.isDone;

    if (todoItem.isDone) {
      task.classList.add("done");
      btnDone.textContent = "To do";
    } else {
      task.classList.remove("done");
      btnDone.textContent = "Done";
    }

    updateLocalStorage();
  };

  li.append(btnDone, task, btnDelete);
  todoContainer.append(li);

  input.value = "";

  updateLocalStorage();

  li.scrollIntoView({ behavior: "smooth" });
}

function loadItems(items) {
  items.forEach(({ id, item }) => generateItem({ id, inputValue: item }));
}

function updateLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}
