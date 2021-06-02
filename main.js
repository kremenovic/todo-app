// SELECT ALL ELEMENTS
const header_date = document.querySelector(".header__date");
const todo_input = document.querySelector(".add_todo__input");
const todo_btn = document.querySelector(".add_todo__btn");
const filterBtns = document.querySelectorAll(".btn");
const todoItems = document.querySelector(".todo_list");
const activeTodoItems = document.getElementById("active");
const finishedTodoItems = document.getElementById("finished");

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

const addTodo = (e) => {
  e.preventDefault();
  let value = todo_input.value;
  let itemID = todo_id++;
  let countTodos = activeTodoItems.childElementCount;

  if (value) {
    createTodoElement(value, itemID);
    setBackToDefault();
    removeTodoElement();
  }

}

// CREATE TODO ELEMENT
const createTodoElement = (val, id) => {
  let item = document.createElement("div");
  item.classList.add("todo_list__item");
  item.setAttribute("data-status", "false");
  let item_content = `<div class="item_text">
  <input type="checkbox" name="${id}" id="${id}">
  <label for="${id}">${val}</label>
  </div>
  <div class="item__action_btns">
  <a href="#" class="btn--edit"><i class="fas fa-pen"></i></a>
  <a href="#" class="btn--delete"><i class="fas fa-trash-alt"></i></a>
  </div>`;
  item.innerHTML = item_content;
  activeTodoItems.appendChild(item);
}

// REMOVE TODO ELEMENT
const removeTodoElement = () => {
  const deleteBtns = document.querySelectorAll(".btn--delete");
  deleteBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      let element = e.currentTarget.parentElement.parentElement;
      element.remove();
    })
  })
}

// EDIT TODO ELEMENT
const editTodoElement = () => {
 
}

// SET BACK TO DEFAULT
const setBackToDefault = () => {
  todo_input.value = "";
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

// LOCAL STORAGE

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderDate();
  removeTodoElement();
  editTodoElement();
})

todo_btn.addEventListener("click", addTodo);

filterBtns.forEach(btn => {
  btn.addEventListener("click", displayTodos);
})