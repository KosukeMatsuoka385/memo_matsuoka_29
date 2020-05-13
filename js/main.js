const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector("#todo-button");
const todoTime = document.querySelector("#time-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);


function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  const timerButton = document.createElement("button");
  timerButton.innerHTML = '<i class="far fa-clock"></i></i>';
  timerButton.classList.add("timer-btn");
  todoDiv.appendChild(timerButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";

}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    removeLocalTools(todo);
    todo.remove();
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

let countdown;
let cutNum = 5;
let isRunning = false;
// var audio = new Audio('../audio/noise.wav');

function countdown_trigger() {
  if(isRunning === false) {
    if (countdown_number > 0) {
      countdown_number--;
      document.getElementById('countdown_text').innerHTML = countdown_number;
      if (countdown_number > 0) {
        countdown = setTimeout(countdown_trigger, 1000);
      }
  }
    setTimeout(function () {
      if (countdown_number === 0) {
        // audio.play()
        alert("Finish");
        $("#countdown_text").html("Time");
      }
    }, 10);
  }
}

function countdown_clear() {
  clearTimeout(countdown);
}

function countdown_init() {
  countdown_number = cutNum + 1;
  countdown_trigger();
}

document.getElementById('start').onclick = countdown_init;
document.getElementById('stop').onclick = countdown_clear;


function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    const timerButton = document.createElement("button");
    timerButton.innerHTML = '<i class="far fa-clock"></i></i>';
    timerButton.classList.add("timer-btn");
    todoDiv.appendChild(timerButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTools(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}