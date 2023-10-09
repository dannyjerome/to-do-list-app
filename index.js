// Load tasks from local storage or initialize an empty array
const myArray = JSON.parse(localStorage.getItem('tasks')) || [];

// Get references to HTML elements
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('listInput');
const taskDate = document.getElementById('taskDate'); // Add this line to get the task date
const addTaskButton = document.getElementById('addTask');
const warning = document.getElementById('warning');

// Function to update the task list displayed on the page
function updateTaskList() {
  taskList.innerHTML = '';
  myArray.forEach((task, index) => {
    const newTask = document.createElement('li');
    newTask.textContent = task.text;

    // Display the due date if available
    newTask.innerHTML += `<span>Due date: ${task.date}</span>`;

    // Create a delete button for each task
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    // Add a click event listener to the delete button to remove the task
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });

    // Append the delete button to the task
    newTask.appendChild(deleteButton);

    // Append the task to the task list
    taskList.appendChild(newTask);
  });
}

// Function to save tasks in local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(myArray));
}

// Function to delete a task by its index
function deleteTask(index) {
  myArray.splice(index, 1);
  saveTasks();
  updateTaskList();
}

// Add a click event listener to the "Add to list" button
addTaskButton.addEventListener('click', function () {
  // Get the task text and due date
  const text = taskInput.value.trim();
  const date = taskDate.value; // Get the task date

  if (text === '') {
    // Display a warning if the task text is empty
    warning.textContent = 'Please enter a task.';
  } else {
    warning.textContent = ''; // Clear any previous warnings

    if (date === '') {
      // Display a warning if the due date is empty
      warning.textContent = 'Please select a due date.';
    } else {
      warning.textContent = ''; // Clear any previous warnings

      // Store both the task text and due date
      myArray.push({ text, date });
      saveTasks();
      updateTaskList();

      // Clear the input fields
      taskInput.value = '';
      taskDate.value = '';
    }
  }
});

// Listen for Enter key press on the task input field
taskInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTaskButton.click();
  }
});

// Initialize the task list when the page loads
updateTaskList();
