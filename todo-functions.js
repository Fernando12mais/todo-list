import { setLocalStorageItem } from "./local-storage";

function createTaskElements({ id, value, container, items }) {
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

  items.push({ id, item: value, isDone: false });

  setLocalStorageItem("items", items);

  return { li, task, btnDelete, btnDone };
}

export function createTask({ id, value, container, items }) {
  const { li, task, btnDelete, btnDone } = createTaskElements({
    id,
    value: value,
    container,
    items,
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
    setLocalStorageItem("items", items);

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
  return items;
}
