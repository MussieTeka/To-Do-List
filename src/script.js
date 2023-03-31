import './style.css';

// Select relevant HTML elements
const form = document.getElementById('form');
const input = document.getElementById('new-item');
const todoList = document.getElementById('todo-list');
const archiveBtn = document.getElementById('archive');
const refreshIcon = document.querySelector('.fa-refresh');
const downArrowIcon = document.querySelector('.fa-level-down');

// Define tasks array and get tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Define functions
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  // Clear current todo list
  todoList.innerHTML = '';
  // Render new todo list based on updated tasks array
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${
  task.completed ? 'checked' : ''
} data-index="${index}">
      <span>${task.description}</span>
      <i class="fa fa-ellipsis-v"></i>
    `;
    li.classList.toggle('completed', task.completed);
    todoList.appendChild(li);
  });
}

function addItem(e) {
  e.preventDefault();
  if (input.value) {
    const newTask = {
      description: input.value,
      completed: false,
      index: tasks.length,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    input.value = '';
  }
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}

function refreshPage() {
  window.location.reload();
}

function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasks();
  renderTasks();
}

function updateTasksIndexes() {
  tasks.forEach((task, index) => {
    task.index = index;
  });
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  updateTasksIndexes();
}

function editTaskDescription(e) {
  const li = e.target.closest('li');
  const span = li.querySelector('span');
  const { index } = li.querySelector('input').dataset;

  span.setAttribute('contentEditable', true);
  span.focus();
  span.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      span.blur();
    }
  });

  span.addEventListener('blur', () => {
    const newDescription = span.textContent.trim();
    if (newDescription === '') {
      deleteTask(index);
    } else {
      editTask(index, newDescription);
    }
  });
}

function toggleItem(e) {
  const li = e.target.closest('li');
  if (li) {
    li.classList.toggle('selected');
  }

  if (e.target.tagName === 'INPUT') {
    const { index } = e.target.dataset;
    tasks[index].completed = e.target.checked;
    saveTasks();
    renderTasks();
  } else if (e.target.classList.contains('fa-ellipsis-v')) {
    const item = e.target.parentNode;
    const prev = item.previousSibling;
    todoList.insertBefore(item, prev);
    updateTasksIndexes();
  }
}
// Add event listeners
form.addEventListener('submit', addItem);
todoList.addEventListener('click', toggleItem);
todoList.addEventListener('dblclick', editTaskDescription);
archiveBtn.addEventListener('click', clearCompleted);
refreshIcon.addEventListener('click', refreshPage);
downArrowIcon.addEventListener('click', addItem);

// Render initial tasks on page load
renderTasks();
