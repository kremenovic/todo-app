// SELECT ALL ELEMENTS
const header_date = document.querySelector(".header__date");
const notification = document.querySelector(".notification");
const todo_input = document.querySelector(".add_todo__input");
const todo_btn = document.querySelector(".add_todo__btn");
const filterBtns = document.querySelectorAll(".btn");
const todoItems = document.querySelector(".todo_list");
const activeTodoItems = document.getElementById("active");
const finishedTodoItems = document.getElementById("finished");

let savedActiveTodos = [];
let savedFinishedTodos = [];

// CHANGE DATE
const updateHeaderDate = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let new_date = new Date ();
  let day = new_date.getDay();
  let month = new_date.getMonth();
  let week_day = days[day];
  let dd = String(new_date.getDate());
  let mm = months[month];
  let yyyy = String(new_date.getFullYear());

  header_date.innerHTML = `${week_day}, ${mm} ${dd}, ${yyyy}`
  
}

// ADD TODO 
let todo_id = null;
let todo_status = "false";
let edit_status = false;
let edit_id = "";
let edit_element;

const addTodo = (e) => {
  e.preventDefault();
  let value = todo_input.value;

  if (value !== "" && !edit_status) {
    // create element
    let itemID = todo_id++;
    createNewElement(itemID, value, todo_status);
    savedActiveTodos.push({id: itemID, value, status: "false"});
    addToLocalStorage();
    setBackToDefault();
  } else if (value !== "" && edit_status) {
    edit_element.innerHTML = value;
    notificationMessage("success", "Item successfully updated", 1500);
    setBackToDefault();
  } else if (value === "") {
    console.log("empty");
  }
}

// CREATE NEW ELEMENT
const createNewElement = (id, value, status) => {
  let item = document.createElement("div");
  item.classList.add("todo_list__item");
  item.setAttribute("data-status", status);
  item.setAttribute("data-id", id);
  item.innerHTML = `<div class="item_text">
  <input type="checkbox" name="${id}" id="${id}">
  <label for="${id}">${value}</label>
  </div>
  <div class="item__action_btns">
  <button class="btn--edit"><i class="fas fa-pen"></i></button>
  <button class="btn--delete"><i class="fas fa-trash-alt"></i></button>
  </div>`;
  // add event listeners to delete & edit btns
  const checkDone = item.querySelector("input");
  const editBtn = item.querySelector(".btn--edit");
  const deleteBtn = item.querySelector(".btn--delete");
  checkDone.addEventListener("click", checkTodoDone);
  editBtn.addEventListener("click", editTodoElement);
  deleteBtn.addEventListener("click", removeTodoElement);
  // append create el. to active todo
  activeTodoItems.appendChild(item);
}

// REMOVE TODO ELEMENT
const removeTodoElement = e => {
  e.preventDefault();
  let element = e.currentTarget.parentElement.parentElement;
  element.remove();
  notificationMessage("warning", "Item successfully deleted", 1500);
}

// EDIT TODO ELEMENT
const editTodoElement = e => {
  e.preventDefault();
  let element = e.currentTarget.parentElement.parentElement;
  edit_element = element.children[0].children[1];
  if(element.parentElement.id === "active") {
    todo_input.value = edit_element.innerHTML;
    edit_status = true;
    edit_id = element.dataset.id;
    todo_btn.value = "EDIT";
  } else {
    e.currentTarget.setAttribute("disabled", "disabled");
    notificationMessage("warning", "You cannot edit finished todo item", 1500);
  }
  
}

// CHECK TODO ELEMENT AS DONE
const checkTodoDone = e => {
  let element = e.currentTarget;
  let item = element.parentElement.parentElement;

  if(element.checked) {
    item.setAttribute("data-status", "true");
    finishedTodoItems.appendChild(item);
    notificationMessage("success", "Todo item marked as done", 1500);
  } else {
    item.setAttribute("data-status", "false");
    activeTodoItems.appendChild(item);
    notificationMessage("success", "Todo item marked as not done yet", 1500);
  }
  
}

// SET BACK TO DEFAULT
const setBackToDefault = () => {
  todo_input.value = "";
  edit_id = "";
  edit_status = false;
  todo_btn.value = "ADD";
}

// FILTER TODO'S
const displayTodos = (e) => {
  e.preventDefault();
  let element = e.currentTarget;
  
  // remove active for all elements
  filterBtns.forEach(btn => {
    btn.classList.remove("btn--active");
  })

  // add active if ...
  if (element.dataset.id === "active") {
    element.classList.add("btn--active");
    activeTodoItems.classList.add("active");
    finishedTodoItems.classList.remove("active");
  } else {
    element.classList.add("btn--active");
    activeTodoItems.classList.remove("active");
    finishedTodoItems.classList.add("active");
  }
}

// NOTIFICATION MESSAGE
const notificationMessage = (validation, message, animationTime) => {
  notification.classList.add(`${validation}`);
  notification.innerHTML = `${message}`;
  setTimeout(function () {
    notification.classList.remove(`${validation}`);
    notification.innerHTML = "";
  }, animationTime);
}

// LOCAL STORAGE
// add to LS
const addToLocalStorage = () => {
  localStorage.setItem("activeTodos", JSON.stringify(savedActiveTodos));
}

// remove from LS
const removeFromLocalStorage = (id) => {
  localStorage.removeItem()
}

// edit in LS

// get from LS
const getFromLocalStorage = () => {
  let getItems = JSON.parse(localStorage.getItem("activeTodos"))
  
  if(getItems === null) {
    localStorage.setItem("activeTodos", JSON.stringify(savedActiveTodos));
  } else if (getItems.length > 0) {
    savedActiveTodos = getItems;
  }
}

// LOAD ITEMS FROM LS
const loadTodos = () => {
  // active todos
  let getActiveTodos = savedActiveTodos.filter(activeTodos => activeTodos.status === "false");
  let showActiveTodos = getActiveTodos.map(todos => {
    createNewElement(todos.id, todos.value, todos.status);
  }).join("");

  // finished todos
  
}

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderDate();
  getFromLocalStorage();
  loadTodos();
})

todo_btn.addEventListener("click", addTodo);

filterBtns.forEach(btn => {
  btn.addEventListener("click", displayTodos);
})

/*

popraviti cuvanje IDova u local storage
napraviti delete from local storage 
napraviti edit local storage gdje se mjenja status true/false i mjenja se value
napraviti da loaduje finished todos iz local storage

*/