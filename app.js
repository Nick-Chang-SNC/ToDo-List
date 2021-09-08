// DEFINE UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click', clearTasks);

    // filter task events
    filter.addEventListener('keyup', filterTasks);
}

// GET TASKS FROM LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // local storage can only hold strings >> use JSON to parse the string to array 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // loops through each task in array and creates DOM elements
    // prints out each item in LS onto page
    tasks.forEach(function(task) {
        // create li element
        const li = document.createElement('li');

        // add li class
        li.className = 'collection-item';

        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        // create new link element
        const link = document.createElement('a');

        // add class to new link element
        link.className = 'delete-item';

        // add icon html to new link element
        link.innerHTML = 'x';

        // append the link to li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
    });
}

// ADD TASK
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task!');
        return;
    }

    // create li element
    const li = document.createElement('li');

    // add li class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');

    // add class to new link element
    link.className = 'delete-item';

    // add icon html to new link element
    link.innerHTML = 'x';

    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear the input
    taskInput.value = '';

    // prevent default from occurring
    e.preventDefault();
}

// STORE TASK
function storeTaskInLocalStorage(task) {
    let tasks;
    // checks to see if null => if so, will create an array
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // local storage can only hold strings >> use JSON to parse the string to array 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// REMOVE TASK
function removeTask(e) {
    if(e.target.className === 'delete-item') {
        if(confirm('Delete this task?')) {
            e.target.parentElement.remove();

            // remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }
}

// FUNCTION TO REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // local storage can only hold strings >> use JSON to parse the string to array 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks = tasks.filter(function(task) {
        return taskItem.firstChild.textContent !== task
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR TASK
function clearTasks() {
    confirm('Clear all tasks?');

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}

// FILTER TASK
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}