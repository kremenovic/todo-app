// Select All Elements

const header_date = document.querySelector(".header__date");
const todo_input = document.querySelector(".add_todo__input");
const todo_btn = document.querySelector(".add_todo__btn");
const filterBtns = document.querySelectorAll(".btn");
const todoItems = document.querySelector(".todo_list__items");

// Days
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Change date
const updateHeaderDate = () => {
  let new_date = new Date ();
  let day = new_date.getDay();
  let week_day = days[day];
  let dd = String(new_date.getDate());
  let mm = String(new_date.getMonth() + 1);
  let yyyy = String(new_date.getFullYear());

  header_date.innerHTML = `${week_day}, ${dd}.${mm}.${yyyy}`
  
}

// Add Todo

// Filter Todo

// Local Storage

updateHeaderDate();