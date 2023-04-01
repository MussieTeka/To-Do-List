import './style.css';
/* eslint-disable import/no-cycle */
import {
  addItem,
  saveTasks,
  tasks,
  editTaskDescription,
  toggleItem,
  updateTasksIndexes,
  clearCompleted,
} from './next.js';

import renderTasks from './interactive.js';

// Select relevant HTML elements
const form = document.getElementById('form');
export const input = document.getElementById('new-item');
export const todoList = document.getElementById('todo-list');
const archiveBtn = document.getElementById('archive');
const refreshIcon = document.querySelector('.fa-refresh');
const downArrowIcon = document.querySelector('.fa-level-down');

function refreshPage() {
  window.location.reload();
}

export function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasks();
  renderTasks();
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasksIndexes();
  saveTasks();
  renderTasks();
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
