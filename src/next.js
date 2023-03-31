import './style.css';
/* eslint-disable import/no-cycle */
import {
  todoList, input, deleteTask, editTask,
} from './script.js';

// Define tasks array and get tasks from local storage
/* eslint-disable import/no-mutable-exports */
export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// Define functions

export function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function renderTasks() {
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
      <i class="fa fa-trash"></i>
    `;
    li.classList.toggle('completed', task.completed);
    todoList.appendChild(li);
  });
}

export function addItem(e) {
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

export function updateTasksIndexes() {
  tasks.forEach((task, index) => {
    task.index = index;
  });
  saveTasks();
}

export function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  updateTasksIndexes();
  saveTasks();
  renderTasks();
}

export function editTaskDescription(e) {
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

export function toggleItem(e) {
  const li = e.target.closest('li');
  if (li) {
    li.classList.toggle('selected');
    const ellipsisIcon = li.querySelector('.fa-ellipsis-v');
    const trashIcon = li.querySelector('.fa-trash');
    if (li.classList.contains('selected')) {
      ellipsisIcon.style.display = 'none';
      trashIcon.style.display = 'block';
      trashIcon.style.cursor = 'pointer';
    } else {
      ellipsisIcon.style.display = 'block';
      trashIcon.style.display = 'none';
    }
  }

  if (e.target.tagName === 'INPUT') {
    const { index } = e.target.dataset;
    tasks[index].completed = e.target.checked;
    saveTasks();
    renderTasks();
  } else if (e.target.classList.contains('fa-ellipsis-v')) {
    const item = e.target.parentNode;
    const prev = item.previousElementSibling;
    todoList.insertBefore(item, prev);
    updateTasksIndexes();
  } else if (e.target.classList.contains('fa-trash')) {
    const item = e.target.parentNode;
    const { index } = item.querySelector('input').dataset;
    deleteTask(index);
  }
}
