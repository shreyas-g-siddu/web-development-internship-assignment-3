document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            const actions = document.createElement('div');
            actions.classList.add('actions');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function() {
                const newText = prompt('Edit task:', task.text);
                if (newText !== null) {
                    tasks[index].text = newText;
                    saveTasks();
                    renderTasks();
                }
            });
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', function() {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
            actions.appendChild(completeButton);
            li.appendChild(actions);
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', function() {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({text, completed: false});
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    renderTasks();
});
