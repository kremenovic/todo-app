// SELECT ALL ELEMENTS
const header_date = document.querySelector(".header__date");
const notification = document.querySelector(".notification");
const todo_input = document.querySelector(".add_todo__input");
const todo_btn = document.querySelector(".add_todo__btn");
const filterBtns = document.querySelectorAll(".btn");
const todoItems = document.querySelector(".todo_list");
const activeTodoItems = document.getElementById("active");
const finishedTodoItems = document.getElementById("finished");

let items_array = [];

// CHANGE DATE
const updateHeaderDate = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let new_date = new Date ();
  let day = new_date.getDay();
  let week_day = days[day];
  let dd = String(new_date.getDate());
  let mm = String(new_date.getMonth() + 1);
  let yyyy = String(new_date.getFullYear());

  header_date.innerHTML = `${week_day}, ${dd}.${mm}.${yyyy}`
  
}

// ADD TODO 
let todo_id = null;
let todo_status = false;
let edit_status = false;
let edit_id = "";
let edit_element;

const addTodo = (e) => {
  e.preventDefault();
  let value = todo_input.value;

  if (value !== "" && !edit_status) {
    // create element
    let itemID = todo_id++;
    let item = document.createElement("div");
    item.classList.add("todo_list__item");
    item.setAttribute("data-status", "false");
    item.setAttribute("data-id", itemID);
    item.innerHTML = `<div class="item_text">
    <input type="checkbox" name="${itemID}" id="${itemID}">
    <label for="${itemID}">${value}</label>
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
    items_array.push({id: itemID, value});
    addToLocalStorage(itemID, value);
    setBackToDefault();
  } else if (value !== "" && edit_status) {
    edit_element.innerHTML = value;
    notificationMessage("success", "Item successfully updated", 1500);
    setBackToDefault();
  } else {
    console.log("empty");
  }

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
    notificationMessage("warning", "You cannot edit finished todo item", 4000);
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
const addToLocalStorage = (id, value) => {
  localStorage.setItem("activeTodos", JSON.stringify(items_array));
  
}

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderDate();
})

todo_btn.addEventListener("click", addTodo);

filterBtns.forEach(btn => {
  btn.addEventListener("click", displayTodos);
})