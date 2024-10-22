class Task {
  constructor(title) {
    this.title = title;
    this.id = Date.now(); // Un identifiant unique basé sur le timestamp
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

function displayTodoTasks() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Vider la liste avant d'afficher
  taskManager.getTodoTasks().forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item bg-dark text-light d-flex justify-content-between align-items-center"; // Ajout de d-flex

    // Création d'un conteneur pour la checkbox et le texte de la tâche
    const taskContainer = document.createElement("div");
    taskContainer.className = "d-flex align-items-center"; // Aligne la checkbox et le texte

    // Création de la checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "me-2"; // Ajout d'un margin à droite
    checkbox.onclick = () => {
      if (checkbox.checked) {
        taskContainer.style.textDecoration = "line-through"; // Barrer seulement le texte de la tâche
        taskContainer.style.color = "#d3d3d3"; // Changer la couleur en gris clair
        listItem.style.backgroundColor = "#28a745"; // Changer le fond en vert
      } else {
        taskContainer.style.textDecoration = "none"; // Enlever le barré
        taskContainer.style.color = ""; // Rétablir la couleur
        listItem.style.backgroundColor = ""; // Rétablir le fond
      }
    };

    taskContainer.appendChild(checkbox); // Ajouter la checkbox au conteneur
    taskContainer.appendChild(document.createTextNode(task.title)); // Ajouter le texte de la tâche au conteneur

    listItem.appendChild(taskContainer); // Ajouter le conteneur de la tâche à l'élément de la tâche

    // Ajout du bouton de suppression
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm"; // Pas besoin de float-end, le flexbox s'en occupe
    deleteButton.textContent = "Supprimer";
    deleteButton.onclick = () => {
      taskManager.removeTodoTask(task.id);
      displayTodoTasks(); // Réafficher la liste sans animation
    };

    listItem.appendChild(deleteButton); // Ajouter le bouton à la fin du listItem
    todoList.appendChild(listItem);

    // Appliquer l'animation uniquement à la dernière tâche ajoutée
    if (index === taskManager.getTodoTasks().length - 1) {
      setTimeout(() => {
        listItem.classList.add("added");
      }, 0);
    }
  });
}

function displayTodontTasks() {
  const todontList = document.getElementById("todont-list");
  todontList.innerHTML = ""; // Vider la liste avant d'afficher
  taskManager.getTodontTasks().forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item bg-dark text-light d-flex justify-content-between align-items-center"; // Ajout de d-flex

    // Création d'un conteneur pour la checkbox et le texte de la tâche
    const taskContainer = document.createElement("div");
    taskContainer.className = "d-flex align-items-center"; // Aligne la checkbox et le texte

    // Création de la checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "me-2"; // Ajout d'un margin à droite
    checkbox.onclick = () => {
      if (checkbox.checked) {
        taskContainer.style.textDecoration = "line-through"; // Barrer seulement le texte de la tâche
        taskContainer.style.color = "#d3d3d3"; // Changer la couleur en gris clair
        listItem.style.backgroundColor = "#28a745"; // Changer le fond en vert
      } else {
        taskContainer.style.textDecoration = "none"; // Enlever le barré
        taskContainer.style.color = ""; // Rétablir la couleur
        listItem.style.backgroundColor = ""; // Rétablir le fond
      }
    };

    taskContainer.appendChild(checkbox); // Ajouter la checkbox au conteneur
    taskContainer.appendChild(document.createTextNode(task.title)); // Ajouter le texte de la tâche au conteneur

    listItem.appendChild(taskContainer); // Ajouter le conteneur de la tâche à l'élément de la tâche

    // Ajout du bouton de suppression
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm"; // Pas besoin de float-end, le flexbox s'en occupe
    deleteButton.textContent = "Supprimer";
    deleteButton.onclick = () => {
      taskManager.removeTodontTask(task.id);
      displayTodontTasks(); // Réafficher la liste sans animation
    };

    listItem.appendChild(deleteButton); // Ajouter le bouton à la fin du listItem
    todontList.appendChild(listItem);

    // Appliquer l'animation uniquement à la dernière tâche ajoutée
    if (index === taskManager.getTodontTasks().length - 1) {
      setTimeout(() => {
        listItem.classList.add("added");
      }, 0);
    }
  });
}

// Gestionnaire d'événements pour le formulaire "À faire"
document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const taskInput = document.getElementById("new-task-todo");
  const taskTitle = taskInput.value;
  taskManager.addTodoTask(taskTitle);
  displayTodoTasks(); // Afficher la tâche ajoutée avec animation
  taskInput.value = ""; // Réinitialiser le champ
});

// Gestionnaire d'événements pour le formulaire "À ne pas faire"
document.getElementById("todont-do-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const taskInput = document.getElementById("new-task-todont");
  const taskTitle = taskInput.value;
  taskManager.addTodontTask(taskTitle);
  displayTodontTasks(); // Afficher la tâche ajoutée avec animation
  taskInput.value = ""; // Réinitialiser le champ
});
