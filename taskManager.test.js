// taskManager.test.js
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

let document, window;

beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    const jsdom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    window = jsdom.window;
    document = window.document;
    global.window = window;
    global.document = document;
    require('../script.js'); // Adjust the path to your script file
});

test('should add a new task', () => {
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const deadlineInput = document.getElementById('deadline-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    const reminderInput = document.getElementById('reminder-input');
    const assigneeInput = document.getElementById('assignee-input');
    const recurrenceInput = document.getElementById('recurrence-input');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    taskInput.value = 'Test Task';
    categoryInput.value = 'Development';
    deadlineInput.value = '2024-12-31';
    dueDateInput.value = '2024-12-31';
    priorityInput.value = 'high';
    reminderInput.value = '2024-12-30T10:00';
    assigneeInput.value = 'test@example.com';
    recurrenceInput.value = 'none';

    taskForm.dispatchEvent(new Event('submit'));

    expect(taskList.children.length).toBeGreaterThan(0);
    const addedTask = taskList.querySelector('li');
    expect(addedTask.textContent).toContain('Test Task');
    expect(addedTask.textContent).toContain('Development');
    expect(addedTask.textContent).toContain('2024-12-31');
    expect(addedTask.textContent).toContain('high');
    expect(addedTask.textContent).toContain('2024-12-30T10:00');
    expect(addedTask.textContent).toContain('test@example.com');
    expect(addedTask.textContent).toContain('none');
});

test('should update a task', () => {
    // Add a task first
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const deadlineInput = document.getElementById('deadline-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    const reminderInput = document.getElementById('reminder-input');
    const assigneeInput = document.getElementById('assignee-input');
    const recurrenceInput = document.getElementById('recurrence-input');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    taskInput.value = 'Update Task';
    categoryInput.value = 'Design';
    deadlineInput.value = '2024-11-30';
    dueDateInput.value = '2024-11-30';
    priorityInput.value = 'medium';
    reminderInput.value = '2024-11-29T08:00';
    assigneeInput.value = 'update@example.com';
    recurrenceInput.value = 'daily';

    taskForm.dispatchEvent(new Event('submit'));

    const updateButton = taskList.querySelector('.update');
    updateButton.click();

    const updateForm = document.getElementById('update-form');
    const updateTaskInput = document.getElementById('update-task-input');
    const updateCategoryInput = document.getElementById('update-category-input');
    const updateDeadlineInput = document.getElementById('update-deadline-input');
    const updateDueDateInput = document.getElementById('update-due-date-input');
    const updatePriorityInput = document.getElementById('update-priority-input');
    const updateReminderInput = document.getElementById('update-reminder-input');
    const updateAssigneeInput = document.getElementById('update-assignee-input');
    const updateRecurrenceInput = document.getElementById('update-recurrence-input');
    const updateTaskId = document.getElementById('update-task-id');

    updateTaskId.value = 'Update Task';
    updateTaskInput.value = 'Updated Task';
    updateCategoryInput.value = 'Updated Category';
    updateDeadlineInput.value = '2024-12-31';
    updateDueDateInput.value = '2024-12-31';
    updatePriorityInput.value = 'low';
    updateReminderInput.value = '2024-12-30T09:00';
    updateAssigneeInput.value = 'updated@example.com';
    updateRecurrenceInput.value = 'weekly';

    updateForm.dispatchEvent(new Event('submit'));

    const updatedTask = taskList.querySelector('li');
    expect(updatedTask.textContent).toContain('Updated Task');
    expect(updatedTask.textContent).toContain('Updated Category');
    expect(updatedTask.textContent).toContain('2024-12-31');
    expect(updatedTask.textContent).toContain('low');
    expect(updatedTask.textContent).toContain('2024-12-30T09:00');
    expect(updatedTask.textContent).toContain('updated@example.com');
    expect(updatedTask.textContent).toContain('weekly');
});

test('should delete a task', () => {
    // Add a task first
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const deadlineInput = document.getElementById('deadline-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    const reminderInput = document.getElementById('reminder-input');
    const assigneeInput = document.getElementById('assignee-input');
    const recurrenceInput = document.getElementById('recurrence-input');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    taskInput.value = 'Task to Delete';
    categoryInput.value = 'Testing';
    deadlineInput.value = '2024-10-31';
    dueDateInput.value = '2024-10-31';
    priorityInput.value = 'low';
    reminderInput.value = '2024-10-30T11:00';
    assigneeInput.value = 'delete@example.com';
    recurrenceInput.value = 'none';

    taskForm.dispatchEvent(new Event('submit'));

    const deleteButton = taskList.querySelector('.delete');
    deleteButton.click();

    expect(taskList.children.length).toBe(0);
});

test('should log task activity', () => {
    const historyList = document.getElementById('history-list');

    // Add a task
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const deadlineInput = document.getElementById('deadline-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    const reminderInput = document.getElementById('reminder-input');
    const assigneeInput = document.getElementById('assignee-input');
    const recurrenceInput = document.getElementById('recurrence-input');
    const taskForm = document.getElementById('task-form');

    taskInput.value = 'Task with Log';
    categoryInput.value = 'Logging';
    deadlineInput.value = '2024-10-31';
    dueDateInput.value = '2024-10-31';
    priorityInput.value = 'medium';
    reminderInput.value = '2024-10-30T12:00';
    assigneeInput.value = 'log@example.com';
    recurrenceInput.value = 'none';

    taskForm.dispatchEvent(new Event('submit'));

    const historyItems = historyList.querySelectorAll('li');
    expect(historyItems.length).toBeGreaterThan(0);
    expect(historyItems[0].textContent).toContain('Task "Task with Log" Added');
});

