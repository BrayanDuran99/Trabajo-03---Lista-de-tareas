// Obtener referencias a los elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');

// Cargar tareas desde localStorage al inicio
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Agregar tarea cuando se envía el formulario
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        showErrorMessage("El campo no puede estar vacío.");
    } else {
        addTask(taskText);
        taskInput.value = '';
        errorMessage.textContent = '';  // Limpiar mensaje de error
    }
});

// Función para mostrar mensaje de error
function showErrorMessage(message) {
    errorMessage.textContent = message;
}

// Función para agregar una tarea a la lista
function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    
    // Botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-btn');
    li.appendChild(deleteButton);

    // Marcar como completada al hacer clic en la tarea
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasksToLocalStorage();  // Guardar estado en localStorage
    });

    // Eliminar tarea
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();  // Evitar marcar como completada
        taskList.removeChild(li);
        saveTasksToLocalStorage();
    });

    taskList.appendChild(li);
    saveTasksToLocalStorage();
}

// Función para guardar tareas en localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(function(li) {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-btn');
        li.appendChild(deleteButton);

        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasksToLocalStorage();
        });

        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation();
            taskList.removeChild(li);
            saveTasksToLocalStorage();
        });

        taskList.appendChild(li);
    });
}
