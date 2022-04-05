// Select everything
// Select the todo-form

const todoForm = document.querySelector('.toDoForm');

// Select the input box

const todoInput = document.querySelector('.toDoFormInput');

// select the <ul> with class='toDoItem'

const todoItemsList = document.querySelector('.toDoListItems');

// Arrays that will stores todos

let todos = [];

// add an eventListener on form add button and listen for submit event

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

// function to add todo

function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = '';
    } else {
        alert("Vous n'avez pas indiqué de tâches!")
    }
}

function renderTodos(todos) {

    todoItemsList.innerHTML = '';

    todos.forEach (function(item) {
        const checked = item.completed ? 'checked': null;

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id)

        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML= `
            <input type="checkbox" class="checkbox ${checked}">
            <p>${item.name}</p>
            <button class="deleteButton button">X</button>
            `;
        
        todoItemsList.append(li);
    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos (todos);
    }
}

getFromLocalStorage ();



function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id){
    todos = todos.filter(function(item) {
        return item.id != id;
    });

    addToLocalStorage(todos);
}

todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
        console.log(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('deleteButton')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

