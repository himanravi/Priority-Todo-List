class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // DOM Elements
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.todoList = document.getElementById('todoList');
        this.themeToggle = document.getElementById('themeToggle');
        this.filterButtons = document.querySelectorAll('[data-filter]');

        this.initializeApp();
    }

    initializeApp() {
        // Set initial theme
        this.setTheme(this.isDarkMode);

        // Event Listeners
        this.todoForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // Initial render
        this.renderTodos();
    }

    setTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        document.body.classList.toggle('light-mode', !isDark);
        this.themeToggle.innerHTML = isDark ? 
            '<i class="bi bi-sun-fill"></i>' : 
            '<i class="bi bi-moon-fill"></i>';
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
        this.setTheme(this.isDarkMode);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text,
            priority: this.prioritySelect.value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.renderTodos();
        this.todoForm.reset();
    }

    handleFilterClick(e) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.renderTodos();
    }

    toggleTodoComplete(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            const newText = prompt('Edit todo:', todo.text);
            if (newText && newText.trim()) {
                todo.text = newText.trim();
                this.saveTodos();
                this.renderTodos();
            }
        }
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this todo?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.renderTodos();
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getFilteredTodos() {
        return this.todos.filter(todo => 
            this.currentFilter === 'all' || todo.priority === this.currentFilter
        );
    }

    renderTodos() {
        const filteredTodos = this.getFilteredTodos();
        this.todoList.innerHTML = filteredTodos.map(todo => `
            <li class="list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}">
                <div class="d-flex align-items-center">
                    <input type="checkbox" class="form-check-input me-2" 
                           ${todo.completed ? 'checked' : ''} 
                           onchange="todoApp.toggleTodoComplete(${todo.id})">
                    <span class="todo-text">${todo.text}</span>
                    <span class="priority-badge priority-${todo.priority} ms-2">
                        ${todo.priority}
                    </span>
                </div>
                <div class="todo-actions">
                    <button class="btn btn-sm btn-outline-primary me-1" 
                            onclick="todoApp.editTodo(${todo.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" 
                            onclick="todoApp.deleteTodo(${todo.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }
}

// Initialize the app
const todoApp = new TodoApp();
