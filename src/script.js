import './style.css';

// Select relevant HTML elements
const form = document.getElementById('form');
const input = document.getElementById('new-item');
const todoList = document.getElementById('todo-list');
const archiveBtn = document.getElementById('archive');
const refreshIcon = document.querySelector('.fa-refresh');
const downArrowIcon = document.querySelector('.fa-level-down');

// Define initial to-do tasks
const tasks = [
  { description: 'Buy groceries', completed: false, index: 0 },
  { description: 'Walk the dog', completed: false, index: 1 },
  { description: 'Finish homework', completed: true, index: 2 },
];

// Render initial to-do tasks
function renderTasks() {
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} />
      <span>${task.description}</span>
      <i class="fa fa-ellipsis-v"></i>
    `;
    li.classList.toggle('completed', task.completed);
    todoList.appendChild(li);
  });
}

// Define functions
function addItem(e) {
  e.preventDefault();
  if (input.value) {
    const li = document.createElement('li');
    const newTask = {
      description: input.value,
      completed: false,
      index: tasks.length,
    };
    li.innerHTML = `
      <input type="checkbox" />
      <span>${newTask.description}</span>
      <i class="fa fa-ellipsis-v"></i>
    `;
    tasks.push(newTask);
    todoList.appendChild(li);
    input.value = '';
  }
}

function toggleItem(e) {
  if (e.target.tagName === 'INPUT') {
    const item = e.target.parentNode;
    const index = Array.from(todoList.children).indexOf(item);
    tasks[index].completed = e.target.checked;
    item.classList.toggle('completed', e.target.checked);
  } else if (e.target.classList.contains('fa-ellipsis-v')) {
    const item = e.target.parentNode;
    const prev = item.previousSibling;
    todoList.insertBefore(item, prev);
    const currentIndex = Array.from(todoList.children).indexOf(item);
    const prevIndex = currentIndex - 1;
    [tasks[currentIndex], tasks[prevIndex]] = [
      tasks[prevIndex],
      tasks[currentIndex],
    ];
    tasks[currentIndex].index = currentIndex;
    tasks[prevIndex].index = prevIndex;
  }
}

function clearCompleted() {
  const items = todoList.children;
  // eslint-disable-next-line no-plusplus
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    if (item.classList.contains('completed')) {
      const index = Array.from(todoList.children).indexOf(item);
      tasks.splice(index, 1);
      todoList.removeChild(item);
    }
  }
}

function refreshPage() {
  window.location.reload();
}

// Add event listeners
form.addEventListener('submit', addItem);
todoList.addEventListener('click', toggleItem);
archiveBtn.addEventListener('click', clearCompleted);
refreshIcon.addEventListener('click', refreshPage);
downArrowIcon.addEventListener('click', addItem);

// Render initial tasks
renderTasks();
