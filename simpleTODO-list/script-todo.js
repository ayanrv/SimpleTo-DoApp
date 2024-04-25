const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const sortBtn = document.getElementById("sortBtn");
const sortBtnReverse = document.getElementById("sortBtnReverse");
let tasks = [];

function addTask() {
  if(tasks.includes(+taskInput.value) || tasks.includes(taskInput.value)){
    alert('Repeting of value')
  }
  else if(taskInput.value != '' && taskInput.value != +taskInput.value){
    tasks.push(taskInput.value)
    taskInput.value = "";
  }
  else if(taskInput.value != '' && taskInput.value == +taskInput.value){
    tasks.push(+taskInput.value)
    taskInput.value = "";
  }
    displayTasks();
    saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
  saveTasks();
}

// sdelat obratnuyu sortirovku primer v lekcii 1
let flag = true;
function sortTasks(){
  if(flag === true){
    tasks = tasks.sort((a,b) => a < b ? 1 : -1)
    flag = false
  }
  else if(flag === false){
    tasks = tasks.sort((a,b) => a > b ? 1 : -1)
    flag = true
  }
  displayTasks();
  saveTasks();
}

// function sortTasks() {
//   tasks.sort();
//   displayTasks();
//   saveTasks();
// }
// function sortTasksReverse() {
//   tasks.sort();
//   tasks.reverse();
//   displayTasks();
//   saveTasks();
// }


function displayTasks() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "X";
    deleteBtn.style.color = "white";
    deleteBtn.style.backgroundColor = "#c22f25";
    deleteBtn.addEventListener("click", function() {
      deleteTask(i);
    });
    li.innerHTML = task;
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    displayTasks();
  }
}

addTaskBtn.addEventListener("click", addTask);
sortBtn.addEventListener("click", sortTasks);
// sortBtnReverse.addEventListener("click", sortTasksReverse);

loadTasks();