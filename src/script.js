import './style.css';

// Select relevant HTML elements
const form = document.getElementById('form');
const input = document.getElementById('new-item');
const todoList = document.getElementById('todo-list');
const archiveBtn = document.getElementById('archive');
const refreshIcon = document.querySelector('.fa-refresh');
const downArrowIcon = document.querySelector('.fa-level-down');

// Define functions
function addItem(e) {
  e.preventDefault();
  if (input.value) {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" />
      <span>${input.value}</span>
      <i class="fa fa-ellipsis-v"></i>
    `;
    todoList.appendChild(li);
    input.value = '';
  }
}

function toggleItem(e) {
  if (e.target.tagName === 'INPUT') {
    const item = e.target.parentNode;
    item.classList.toggle('completed');
  } else if (e.target.classList.contains('fa-ellipsis-v')) {
    const item = e.target.parentNode;
    const prev = item.previousSibling;
    todoList.insertBefore(item, prev);
  }
}

function clearCompleted() {
  const items = todoList.children;
  // eslint-disable-next-line no-plusplus
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    if (item.classList.contains('completed')) {
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
downArrowIcon.addEventListener('click', addItem); // Add this line
