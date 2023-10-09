const myArray = ['Get laundry', "Learn JS"];


function handleEnter(event) {
  if (event.key === "Enter") {
    pushList();
  }
}
function pushList() {
  const taskInput = document.getElementById("listInput");
  var item = taskInput.value.trim();
  if (item === "") {
    document.getElementById("warning").innerHTML = "Please enter a task.";
    return;
  } else {
    document.getElementById("warning").innerHTML = "";
  }
  myArray.push(item);

  var taskList = document.getElementById("list");
  var newTask = document.createElement("li");
  newTask.textContent = item;
  list.appendChild(newTask);
  taskInput.value = "";
  console.log(myArray);
  
}
window.onload = function () {
	var taskList = document.getElementById("list");
	myArray.forEach(function (taskText) {
			var newTask = document.createElement("li");
			newTask.textContent = taskText;
			taskList.appendChild(newTask);
	});
}