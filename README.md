# Task Management Application

## Overview:
This application is designed to help users manage tasks efficiently. It provides features for creating, updating, deleting, and tracking tasks, along with support for task categories, deadlines, due dates, priorities, reminders, assignees, and recurrence patterns.

# Key Features:

## Add Task:

Users can create tasks by entering the task name, category, deadline, due date, priority, reminder, assignee, and recurrence pattern.
Tasks are added to a list and stored in local storage.
## Update Task:

An edit form allows users to update existing tasks. Users can modify the task name, category, deadline, due date, priority, reminder, assignee, and recurrence pattern.
Changes are saved to local storage and reflected in the task list.
## Delete Task:

Tasks can be removed from the list and local storage.
Deleted tasks are logged in the task history.
## Complete Task:

Users can mark tasks as complete or incomplete.
Completed tasks are visually indicated and logged in the task history.
## Task History:

A history section tracks all actions performed on tasks, including additions, updates, and deletions.
## Task Categories:

Tasks can be categorized for better organization.
## Deadlines and Due Dates:

Users can set deadlines and due dates for tasks to manage timelines effectively.
## Priority Levels:

Tasks can be assigned priority levels (low, medium, high) to help users focus on important tasks.
Reminders:

Users can set reminders for tasks, which will be displayed in a human-readable format.
## Assignees:

Tasks can be assigned to users via email addresses.
## Recurrence:

Tasks can be set to recur daily, weekly, or monthly.
## Implementation:

HTML: Provides the structure for the task form, task list, task history, and update form.
CSS: Styles the form, task list, and update form for better user experience.
JavaScript: Handles task management logic including adding, updating, deleting, and displaying tasks. Manages task history and interacts with local storage to persist data.

# Testing
## Test Setup
npm install --save-dev jest

Add taskManager.test.js to "__tests__" directory

Add to the package.json

"scripts": {
  "test": "test"
}


## Running the test
npm test

## Test Cases:
Add Task: Checks if tasks are correctly added and displayed.
Update Task: Tests if tasks are updated correctly and the changes are reflected in the UI and local storage.
Delete Task: Verifies that tasks can be deleted and the list is updated accordingly.
Log Task Activity: Ensures that task activities are logged correctly.
