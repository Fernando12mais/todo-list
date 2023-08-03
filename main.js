const todoContainer = document.querySelector("#todo-items");
const input = document.querySelector("#input");
const btnCreate = document.querySelector("#create");
const form = document.querySelector("#form");

let items = [];

window.addEventListener("load", () => {
  const persistedItems = JSON.parse(localStorage.getItem("items"));

  if (persistedItems) {
    items = persistedItems;
    loadItems(items);

    console.log(items);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!input.value) return;
  const id = Math.random();
  items.push({ id, item: input.value, isDone: false });
  generateItem({ id, inputValue: input.value });
});

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
  task.addEventListener("focus", () => {
    task.readOnly = false;
  });
  task.addEventListener("blur", () => {
    task.readOnly = true;
  });

  task.addEventListener("change", (event) => {
    items.forEach((item) => {
      if (item.id == id) {
        item.item = event.target.value;
        updateLocalStorage();
      }
    });
  });

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-delete");
  btnDelete.append("Delete");
  btnDelete.type = "button";

  btnDelete.addEventListener("click", () => {
    deleteItem(id);
    updateLocalStorage();

    li.classList.add("fade-out");
    li.addEventListener("animationend", () => {
      li.remove();
    });
  });

  const btnDone = document.createElement("input");

  btnDone.type = "checkbox";
  btnDone.classList.add("btn-done");

  btnDone.addEventListener("click", () => {
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
  });

  li.append(btnDone, task, btnDelete);
  todoContainer.append(li);

  input.value = "";

  updateLocalStorage();

  todoContainer.scrollTo({
    top: todoContainer.scrollHeight,
    behavior: "smooth",
  });
}

function loadItems(items) {
  items.forEach(({ id, item }) => generateItem({ id, inputValue: item }));
}

function updateLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}
