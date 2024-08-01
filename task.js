document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const updateForm = document.getElementById('update-form');
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const deadlineInput = document.getElementById('deadline-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    const reminderInput = document.getElementById('reminder-input');
    const assigneeInput = document.getElementById('assignee-input');
    const recurrenceInput = document.getElementById('recurrence-input');
    const taskList = document.getElementById('task-list');
    const historyList = document.getElementById('history-list');
    const updateFormContainer = document.getElementById('update-form-container');
    const updateTaskInput = document.getElementById('update-task-input');
    const updateCategoryInput = document.getElementById('update-category-input');
    const updateDeadlineInput = document.getElementById('update-deadline-input');
    const updateDueDateInput = document.getElementById('update-due-date-input');
    const updatePriorityInput = document.getElementById('update-priority-input');
    const updateReminderInput = document.getElementById('update-reminder-input');
    const updateAssigneeInput = document.getElementById('update-assignee-input');
    const updateRecurrenceInput = document.getElementById('update-recurrence-input');
    const updateTaskId = document.getElementById('update-task-id');
    const cancelUpdateButton = document.getElementById('cancel-update');

    // Load tasks and history from localStorage
    loadTasks();
    loadHistory();

    // Add task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const category = categoryInput.value.trim();
        const deadline = deadlineInput.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        const reminder = reminderInput.value;
        const assignee = assigneeInput.value;
        const recurrence = recurrenceInput.value;

        if (taskText !== '' && category !== '' && deadline !== '' && dueDate !== '' && priority !== '' && assignee !== '') {
            addTask(taskText, category, deadline, dueDate, priority, reminder, assignee, recurrence);
            taskInput.value = '';
            categoryInput.value = '';
            deadlineInput.value = '';
            dueDateInput.value = '';
            priorityInput.value = 'low';
            reminderInput.value = '';
            assigneeInput.value = '';
            recurrenceInput.value = 'none';
        }
    });

    // Add task to the list
    function addTask(taskText, category, deadline, dueDate, priority, reminder, assignee, recurrence) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <div>
                <strong>${taskText}</strong>
                <div>Category: ${category}</div>
                <div>Deadline: ${deadline}</div>
                <div>Due Date: ${dueDate}</div>
                <div>Priority: ${priority}</div>
                <div>Reminder: ${reminder ? new Date(reminder).toLocaleString() : 'None'}</div>
                <div>Assignee: ${assignee}</div>
                <div>Recurrence: ${recurrence}</div>
            </div>
            <div>
                <button class="complete">Complete</button>
                <button class="update">Update</button>
                <button class="delete">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
        saveTask(taskText, category, deadline, dueDate, priority, reminder, assignee, recurrence);
        logTaskActivity(taskText, 'Added');
    }

    // Mark task as complete
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete')) {
            const taskItem = e.target.parentElement.parentElement;
            taskItem.querySelector('strong').classList.toggle('completed');
            const taskText = taskItem.querySelector('strong').textContent;
            logTaskActivity(taskText, taskItem.querySelector('strong').classList.contains('completed') ? 'Completed' : 'Undone');
        }
        if (e.target.classList.contains('update')) {
            const taskItem = e.target.parentElement.parentElement;
            showUpdateForm(taskItem);
        }
        if (e.target.classList.contains('delete')) {
            const taskItem = e.target.parentElement.parentElement;
            const taskText = taskItem.querySelector('strong').textContent;
            deleteTask(taskText);
            taskItem.remove();
            logTaskActivity(taskText, 'Deleted');
        }
    });

    // Show update form with task details
    function showUpdateForm(taskItem) {
        updateFormContainer.style.display = 'block';
        const taskText = taskItem.querySelector('strong').textContent;
        const category = taskItem.querySelector('div').nextSibling.textContent.replace('Category: ', '');
        const deadline = taskItem.querySelector('div').nextSibling.nextSibling.textContent.replace('Deadline: ', '');
        const dueDate = taskItem.querySelector('div').nextSibling.nextSibling.nextSibling.textContent.replace('Due Date: ', '');
        const priority = taskItem.querySelector('div').nextSibling.nextSibling.nextSibling.nextSibling.textContent.replace('Priority: ', '');
        const reminder = taskItem.querySelector('div').nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent.replace('Reminder: ', '');
        const assignee = taskItem.querySelector('div').nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent.replace('Assignee: ', '');
        const recurrence = taskItem.querySelector('div').nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent.replace('Recurrence: ', '');

        updateTaskInput.value = taskText;
        updateCategoryInput.value = category;
        updateDeadlineInput.value = deadline;
        updateDueDateInput.value = dueDate;
        updatePriorityInput.value = priority;
        updateReminderInput.value = reminder === 'None' ? '' : new Date(reminder).toISOString().slice(0, -1);
        updateAssigneeInput.value = assignee;
        updateRecurrenceInput.value = recurrence;
        updateTaskId.value = taskText;
    }

    // Update task
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = updateTaskInput.value.trim();
        const category = updateCategoryInput.value.trim();
        const deadline = updateDeadlineInput.value;
        const dueDate = updateDueDateInput.value;
        const priority = updatePriorityInput.value;
        const reminder = updateReminderInput.value;
        const assignee = updateAssigneeInput.value;
        const recurrence = updateRecurrenceInput.value;
        const oldTaskText = updateTaskId.value;

        if (taskText !== '' && category !== '' && deadline !== '' && dueDate !== '' && priority !== '' && assignee !== '') {
            updateTask(oldTaskText, taskText, category, deadline, dueDate, priority, reminder, assignee, recurrence);
            updateFormContainer.style.display = 'none';
        }
    });

    // Cancel update
    cancelUpdateButton.addEventListener('click', () => {
        updateFormContainer.style.display = 'none';
    });

    // Update task in the list and localStorage
    function updateTask(oldTaskText, taskText, category, deadline, dueDate, priority, reminder, assignee, recurrence) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(task => {
            if (task.text === oldTaskText) {
                return { text: taskText, category: category, deadline: deadline, dueDate: dueDate, priority: priority, reminder: reminder, assignee: assignee, recurrence: recurrence, completed: task.completed };
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        const taskItem = [...taskList.children].find(item => item.querySelector('strong').textContent === oldTaskText);
        if (taskItem) {
            taskItem.querySelector('strong').textContent = taskText;
            taskItem.querySelector('div').innerHTML = `
                <div>Category: ${category}</div>
                <div>Deadline: ${deadline}</div>
                <div>Due Date: ${dueDate}</div>
                <div>Priority: ${priority}</div>
                <div>Reminder: ${reminder ? new Date(reminder).toLocaleString() : 'None'}</div>
                <div>Assignee: ${assignee}</div>
                <div>Recurrence: ${recurrence}</div>
            `;
        }
        logTaskActivity(taskText, 'Updated');
    }

    // Delete task from localStorage
    function deleteTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Log task activity
    function logTaskActivity(taskText, action) {
        const historyItem = document.createElement('li');
        historyItem.textContent = `${new Date().toLocaleString()}: Task "${taskText}" ${action}`;
        historyList.appendChild(historyItem);
    }

    // Load task history from localStorage
    function loadHistory() {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        history.forEach(entry => {
            const historyItem = document.createElement('li');
            historyItem.textContent = entry;
            historyList.appendChild(historyItem);
        });
    }
});
