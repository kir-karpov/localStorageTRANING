const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let toDoData = [];

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      `<span class="text-todo">${item.text}</span>` +
      `<div class="todo-buttons">` +
      `<button class="todo-remove"></button>` +
      `<button class="todo-complete"></button>` +
      `</div>`;

    if (item.completed) {
      todoCompleted.appendChild(li);
    } else {
      todoList.appendChild(li);
    }

    const completeButton = li.querySelector(".todo-complete");
    completeButton.addEventListener("click", function () {
      item.completed = !item.completed;
      saveTasks();
      render();
    });

    const removeButton = li.querySelector(".todo-remove");
    removeButton.addEventListener("click", function () {
      const index = toDoData.indexOf(item);
      if (index > -1) {
        toDoData.splice(index, 1);
        saveTasks();
        render();
      }
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  if (newToDo.text.trim() !== "") {
    toDoData.push(newToDo);
    headerInput.value = "";

    saveTasks();
    render();
  }
});

// Функция для сохранения дел в localStorage
function saveTasks() {
  localStorage.setItem("toDoData", JSON.stringify(toDoData));
}

// Функция для загрузки дел из localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem("toDoData");
  if (savedTasks) {
    toDoData = JSON.parse(savedTasks);
    render();
  }
}

// Загрузка дел при загрузке страницы
window.onload = function () {
  loadTasks();
};
