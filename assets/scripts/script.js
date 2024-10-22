class Task {
  constructor(title) {
    this.title = title;
    this.id = Date.now();
  }
}

class TaskManager {
  constructor() {
    this.todoTasks = [];
    this.todontTasks = [];
  }

  addTodoTask(title) {
    const task = new Task(title);
    this.todoTasks.push(task);
    return task;
  }

  addTodontTask(title) {
    const task = new Task(title);
    this.todontTasks.push(task);
    return task;
  }

  removeTodoTask(id) {
    this.todoTasks = this.todoTasks.filter((task) => task.id !== id);
  }

  removeTodontTask(id) {
    this.todontTasks = this.todontTasks.filter((task) => task.id !== id);
  }

  getTodoTasks() {
    return this.todoTasks;
  }

  getTodontTasks() {
    return this.todontTasks;
  }
}

const taskManager = new TaskManager();

async function fetchRandomActivity() {
  try {
    const response = await fetch("https://bored-api.appbrewery.com/random");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'activité");
    }
    const data = await response.json();
    return data.activity;
  } catch (error) {
    console.error("Erreur:", error);
  }
}

document
  .getElementById("add-random-task-todo")
  .addEventListener("click", async () => {
    const randomTaskTitle = await fetchRandomActivity();
    if (randomTaskTitle) {
      taskManager.addTodoTask(randomTaskTitle);
      displayTodoTasks();
    }
  });

document
  .getElementById("add-random-task-todont")
  .addEventListener("click", async () => {
    const randomTaskTitle = await fetchRandomActivity();
    if (randomTaskTitle) {
      taskManager.addTodontTask(randomTaskTitle);
      displayTodontTasks();
    }
  });

function displayTodoTasks() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  taskManager.getTodoTasks().forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item bg-dark text-light d-flex justify-content-between align-items-center";

    const taskContainer = document.createElement("div");
    taskContainer.className = "d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "me-2";
    checkbox.onclick = () => {
      if (checkbox.checked) {
        taskContainer.style.textDecoration = "line-through";
        taskContainer.style.color = "#d3d3d3";
        listItem.style.backgroundColor = "#28a745";
      } else {
        taskContainer.style.textDecoration = "none";
        taskContainer.style.color = "";
        listItem.style.backgroundColor = "";
      }
    };

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(document.createTextNode(task.title));

    listItem.appendChild(taskContainer);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "Supprimer";
    deleteButton.onclick = () => {
      taskManager.removeTodoTask(task.id);
      displayTodoTasks();
    };

    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    if (index === taskManager.getTodoTasks().length - 1) {
      setTimeout(() => {
        listItem.classList.add("added");
      }, 0);
    }
  });
}

function displayTodontTasks() {
  const todontList = document.getElementById("todont-list");
  todontList.innerHTML = "";
  taskManager.getTodontTasks().forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item bg-dark text-light d-flex justify-content-between align-items-center"; // Ajout de d-flex

    const taskContainer = document.createElement("div");
    taskContainer.className = "d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "me-2";
    checkbox.onclick = () => {
      if (checkbox.checked) {
        taskContainer.style.textDecoration = "line-through";
        taskContainer.style.color = "#d3d3d3";
        listItem.style.backgroundColor = "#28a745";
      } else {
        taskContainer.style.textDecoration = "none";
        taskContainer.style.color = "";
        listItem.style.backgroundColor = "";
      }
    };

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(document.createTextNode(task.title));

    listItem.appendChild(taskContainer);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "Supprimer";
    deleteButton.onclick = () => {
      taskManager.removeTodontTask(task.id);
      displayTodontTasks();
    };

    listItem.appendChild(deleteButton);
    todontList.appendChild(listItem);

    if (index === taskManager.getTodontTasks().length - 1) {
      setTimeout(() => {
        listItem.classList.add("added");
      }, 0);
    }
  });
}

document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const taskInput = document.getElementById("new-task-todo");
  const taskTitle = taskInput.value;
  taskManager.addTodoTask(taskTitle);
  displayTodoTasks();
  taskInput.value = "";
});

document.getElementById("todont-do-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const taskInput = document.getElementById("new-task-todont");
  const taskTitle = taskInput.value;
  taskManager.addTodontTask(taskTitle);
  displayTodontTasks();
  taskInput.value = "";
});
