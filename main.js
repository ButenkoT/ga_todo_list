// 1. ADDING TO-DOS

// Our JSON string of to-dos is retrieved from localStorage - if no to-dos are stored, we initialize as empty array string
let toDos = localStorage.getItem("toDos") || "[]";
// Parsing string to get data type array
toDos = JSON.parse(toDos);

// Assign `ul` element to a variable
const toDoList = document.querySelector(".toDoList");

// Render to-dos on page load - since they can now persist between visits in the browser
renderToDos();

// When user submits form, call addToDo() function
const form = document.querySelector(".toDoForm");
form.addEventListener("submit", addToDo);

const toDoInput = document.querySelector("#inputBox");

function addToDo(event) {
  // Prevents default HTML action on a form submit - page does not refresh
  event.preventDefault();
  
  let toDo = toDoInput.value;
  // Check if user has typed anything in input element
  if (toDo) {
    // Add typed string to `toDos` array
    toDos.push(toDo);
    // Store to-dos array in local storage
    storeToDos();
    // Render all to-dos
    renderToDos();
  }
  
  // Clear value from input element - input is now blank again
  toDoInput.value = "";
}

function storeToDos() {
  window.localStorage.setItem("toDos", JSON.stringify(toDos));
}

function renderToDos() {
  // Clear `ul` element of HTML before rendering - prevents double rendering of to-dos
  toDoList.innerHTML = "";
  
  // For each element in array, render that toDo
  for (let i = 0; i < toDos.length; i++) {
    renderToDo(toDos[i]);
  }
  // Can also use for...of loop
  // for (toDo of toDos) {
  //   renderToDo(toDo);
  // }
  
  document.querySelector(".toDoCount").innerText = toDos.length;
}

function renderToDo(toDo) {
  let li = document.createElement("li");
  li.classList.add("toDoItem");
  li.innerText = toDo;
  toDoList.appendChild(li);
  
  li.addEventListener("click", function(){
    completeToDo(toDo);
  })
}

// 2. COMPLETE TO-DOS

let completedToDos = localStorage.getItem("completedToDos") || "[]";
completedToDos = JSON.parse(completedToDos);
const completedToDoList = document.querySelector(".completedList");
renderCompletedToDos();

// When user clicks a to-do `li` element, this function is called
function completeToDo(toDo) {
  // add completed to-do to completed array
  completedToDos.push(toDo);
  
  // Remove completed to-do from to-dos array
  // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
  toDos = toDos.filter(t => t !== toDo);
  
  // Store both arrays in local storage
  storeToDos();
  storeCompletedToDos();
  // Re-render to-dos and completed to-dos
  renderToDos();
  renderCompletedToDos();
}

function storeCompletedToDos() {
  window.localStorage.setItem("completedToDos", JSON.stringify(completedToDos));
}

// Similar logic with rendering to-dos - but no click event listener
function renderCompletedToDos() {
  completedToDoList.innerHTML = "";
  
  for (completedToDo of completedToDos) {
    renderCompleted(completedToDo);
  }
  
  document.querySelector(".completedToDoCount").innerText = completedToDos.length;
}

function renderCompleted(completed) {
  let li = document.createElement("li");
  li.classList.add("doneItem");
  li.innerText = completed;
  completedToDoList.appendChild(li);
}