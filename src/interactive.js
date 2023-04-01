import './style.css';
/* eslint-disable import/no-cycle */
import { todoList } from './script.js';

import { tasks } from './next.js';

export default function renderTasks() {
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
