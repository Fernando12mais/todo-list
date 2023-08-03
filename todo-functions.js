import { setLocalStorageItem } from "./local-storage";

function createTaskElements({ id, value, container, items, loadingItems }) {
  const li = document.createElement("li");
  li.classList.add("item");
  li.classList.add("fade-in");

  const task = document.createElement("input");
  task.value = value;
  task.readOnly = true;

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-delete");
  btnDelete.append("Delete");
  btnDelete.type = "button";

  const btnDone = document.createElement("input");

  btnDone.type = "checkbox";
  btnDone.classList.add("btn-done");
  li.append(btnDone, task, btnDelete);
  container.append(li);

  if (!loadingItems) {
    items.push({ id, item: value, isDone: false });

    setLocalStorageItem("items", items);
  }

  return { li, task, btnDelete, btnDone };
}

export function createTask({ id, value, container, items, loadingItems }) {
  const { li, task, btnDelete, btnDone } = createTaskElements({
    id,
    value: value,
    container,
    items,
    loadingItems,
  });

  li.scrollIntoView({ behavior: "smooth" });

  task.onfocus = () => {
    task.readOnly = false;
  };
  task.onblur = () => {
    task.readOnly = true;
  };
  task.onchange = (event) => {
    const item = items.find((item) => item.id == id);
    item.item = event.target.value;
  };

  btnDelete.onclick = () => {
    deleteItem(id, items);

    li.classList.replace("fade-in", "fade-out");
    li.onanimationend = () => {
      li.remove();
    };
  };

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

    setLocalStorageItem("items", items);
  };
}

export function deleteItem(id, items) {
  items = items.filter((item) => item.id !== id);

  setLocalStorageItem("items", items);
}

export function loadTasks({ container, items }) {
  const persistedItems = JSON.parse(localStorage.getItem("items"));

  if (persistedItems?.length) {
    items.push(...persistedItems);

    items.forEach(({ item, id }) =>
      createTask({
        container,
        id,
        items,
        loadingItems: true,
        value: item,
      })
    );
  }
}
