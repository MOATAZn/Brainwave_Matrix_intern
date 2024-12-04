class Todo {
    constructor(text, category = 'default', priority = 'medium', dueDate = null) {
      this.id = Date.now();
      this.text = text;
      this.completed = false;
      this.category = category;
      this.priority = priority;
      this.dueDate = dueDate;
      this.createdAt = new Date().toISOString();
      this.notes = '';
    }
  }

 class TodoStore {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.categories = JSON.parse(localStorage.getItem('categories')) || ['Personal', 'Work', 'Shopping'];
  }

  addTodo(text, category, priority, dueDate) {
    const todo = new Todo(text, category, priority, dueDate);
    this.todos.unshift(todo);
    this.save();
    return todo;
  }

  updateTodo(id, updates) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      Object.assign(todo, updates);
      this.save();
    }
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodos() {
    return this.todos;
  }
}

function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
   function isOverdue(date) {
    if (!date) return false;
    return new Date(date) < new Date();
  }
 class TodoUI {
  constructor(store) {
    this.store = store;
    this.currentFilter = 'all';
    this.currentSort = 'date';
    this.init();
  }


  ////////////////

  init() {
    this.todoList = document.querySelector('.todo-list');
    this.todoForm = document.querySelector('.todo-form');
    this.filterSelect = document.querySelector('.filter-select');
    this.sortSelect = document.querySelector('.sort-select');
    this.clearCompletedBtn = document.querySelector('#clear-completed');
    this.markAllBtn = document.querySelector('#mark-all');
    
    this.setupEventListeners();
    this.render();
    this.updateStats();
  }

  setupEventListeners() {
    this.todoForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.todoList.addEventListener('click', this.handleTodoClick.bind(this));
    this.filterSelect.addEventListener('change', this.handleFilter.bind(this));
    this.sortSelect.addEventListener('change', this.handleSort.bind(this));
    this.clearCompletedBtn.addEventListener('click', this.handleClearCompleted.bind(this));
    this.markAllBtn.addEventListener('click', this.handleMarkAll.bind(this));
    
    // Setup drag and drop
    this.todoList.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.todoList.addEventListener('dragover', this.handleDragOver.bind(this));
    this.todoList.addEventListener('drop', this.handleDrop.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get('todo-text').trim();
    const category = formData.get('category');
    const priority = formData.get('priority');
    const dueDate = formData.get('due-date');

    if (text) {
      this.store.addTodo(text, category, priority, dueDate);
      e.target.reset();
      this.render();
      this.updateStats();
    }
  }

  handleTodoClick(e) {
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;
    
    const id = Number(todoItem.dataset.id);
    
    if (e.target.classList.contains('delete-btn')) {
      this.store.deleteTodo(id);
    } else if (e.target.classList.contains('todo-checkbox')) {
      this.store.toggleTodo(id);
    } else if (e.target.classList.contains('edit-notes-btn')) {
      const notes = prompt('Enter notes:', todoItem.dataset.notes);
      if (notes !== null) {
        this.store.updateTodo(id, { notes });
      }
    }
    this.render();
    this.updateStats();
  }

  handleFilter(e) {
    this.currentFilter = e.target.value;
    this.render();
  }

  handleSort(e) {
    this.currentSort = e.target.value;
    this.render();
  }

  handleClearCompleted() {
    const completed = this.store.getTodos().filter(todo => todo.completed);
    completed.forEach(todo => this.store.deleteTodo(todo.id));
    this.render();
    this.updateStats();
  }

  handleMarkAll() {
    const allCompleted = this.store.getTodos().every(todo => todo.completed);
    this.store.getTodos().forEach(todo => {
      this.store.updateTodo(todo.id, { completed: !allCompleted });
    });
    this.render();
    this.updateStats();
  }

  handleDragStart(e) {
    const todoItem = e.target.closest('.todo-item');
    if (todoItem) {
      e.dataTransfer.setData('text/plain', todoItem.dataset.id);
      todoItem.classList.add('dragging');
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    const todoItem = e.target.closest('.todo-item');
    if (todoItem && !todoItem.classList.contains('dragging')) {
      const draggingItem = this.todoList.querySelector('.dragging');
      const rect = todoItem.getBoundingClientRect();
      const offset = e.clientY - rect.top - rect.height / 2;
      
      if (draggingItem && offset < 0) {
        todoItem.parentNode.insertBefore(draggingItem, todoItem);
      } else if (draggingItem && todoItem.nextSibling) {
        todoItem.parentNode.insertBefore(draggingItem, todoItem.nextSibling);
      }
    }
  }

  handleDrop(e) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggingItem = this.todoList.querySelector(`[data-id="${draggedId}"]`);
    if (draggingItem) {
      draggingItem.classList.remove('dragging');
    }
  }

  updateStats() {
    const todos = this.store.getTodos();
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;

    document.getElementById('total-count').textContent = total;
    document.getElementById('active-count').textContent = active;
    document.getElementById('completed-count').textContent = completed;
  }

  sortTodos(todos) {
    return todos.sort((a, b) => {
      switch (this.currentSort) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        default:
          return 0;
      }
    });
  }

  filterTodos(todos) {
    switch (this.currentFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  render() {
    let todos = this.store.getTodos();
    todos = this.filterTodos(todos);
    todos = this.sortTodos(todos);

    this.todoList.innerHTML = todos
      .map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}" 
            data-id="${todo.id}" 
            data-notes="${todo.notes || ''}"
            draggable="true">
          <div class="todo-content">
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <div class="todo-info">
              <span class="todo-text">${todo.text}</span>
              <div class="todo-meta">
                <span class="todo-category">${todo.category}</span>
                ${todo.dueDate ? `
                  <span class="todo-due-date ${isOverdue(todo.dueDate) ? 'overdue' : ''}">
                    📅 Due: ${formatDate(todo.dueDate)}
                  </span>
                ` : ''}
                ${todo.notes ? '<span class="todo-notes-indicator">📝 Has notes</span>' : ''}
              </div>
            </div>
          </div>
          <div class="todo-actions">
            <button class="edit-notes-btn" title="Edit Notes">📝</button>
            <button class="delete-btn" title="Delete">×</button>
          </div>
        </li>
      `)
      .join('');
  }
}

const todoStore = new TodoStore();
const todoUI = new TodoUI(todoStore);

