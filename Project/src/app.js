const taskTemplate = `
  <div class="task" draggable="true">
    <p class="task-title">{title}</p>
    <div class="task-details">
      <div class="task-info">
        <div class="avatar"></div>
        <p class="task-code">
          {tag}
        </p>
      </div>
      <div class="task-status">
        <div class="task-type">
          <i class="fa {taskType}"></i>
        </div>
        <div class="task-priority">
          <i class="fa fa-arrow-up {priority}"></i>
        </div>
      </div>
    </div>
  </div>`;

const taskTypeIcons = {
  task: "fa-bookmark icon-blue",
  improvement: "fa-chart-line icon-teal",
  bug: "fa-bug icon-red",
};

const priorityIcons = {
  low: "icon-green",
  medium: "icon-yellow",
  high: "icon-orange",
  urgent: "icon-red",
};

const tasks = {
  backlog: [],
  selected: [],
  inProgress: [],
  done: [],
};
dragAndDrop();
const backlog = document.querySelector(".board section:first-child .tasks");
const selForDev = document.querySelector(".board section:nth-child(2) .tasks");
const inProg = document.querySelector(".board section:nth-child(3) .tasks");
const done = document.querySelector(".board section:nth-child(4) .tasks");

const addTaskButton = document
  .getElementById("addTask")
  .addEventListener("click", showForm);

function compileToNode(domString) {
  const div = document.createElement("div");
  div.innerHTML = domString;

  return div.firstElementChild;
}

function compileTaskTemplate(title, tag, taskType, priority, template) {
  const compiledTemplate = template
    .replace("{title}", title)
    .replace("{tag}", tag)
    .replace("{taskType}", getTaskTypeIcon(taskType))
    .replace("{priority}", getPriorityIcon(priority));
  return compileToNode(compiledTemplate);
}

function addTask(title, taskType, priority) {
  const newTask = {
    title: title,
    taskType: taskType,
    priority: priority,
    tag: getId(taskType),
  };
  tasks.backlog.push(newTask);
  const task = compileTaskTemplate(
    newTask.title,
    newTask.tag,
    newTask.taskType,
    newTask.priority,
    taskTemplate
  );
  backlog.appendChild(task);
  dragAndDrop();
}

function showForm() {
  const form = document.body.appendChild(showAddForm());
  form.classList.add("show");
  const closeButton = form.querySelector(".close");

  const closeAddTaskForm = () => {
    form.removeEventListener("submit", submitTask);
    closeButton.removeEventListener("click", closeAddTaskForm);
    form.classList.remove("show");
  };

  const submitTask = (event) => {
    event.preventDefault();

    const { target } = event;

    const title = target.querySelector('[name="title"]').value;
    const type = target.querySelector('[name="type"]').value;
    const priority = target.querySelector('[name="priority"]').value;
    addTask(title, type, priority);
    closeAddTaskForm();
  };

  closeButton.addEventListener("click", closeAddTaskForm);
  form.addEventListener("submit", submitTask);
}

function getId(taskType) {
  const allTasks = Object.keys(tasks).reduce((accumulator, currentValue) => {
    return (accumulator += tasks[currentValue].length);
  }, 0);
  // the id for a new task will be based on the number of total tasks in the board
  // with reduce, we get the total number of tasks
  const taskNumber = allTasks + 1;
  switch (taskType) {
    case "task":
      return "TASK-" + taskNumber;
    case "improvement":
      return `IMPROVEMENT-${taskNumber}`;
    default:
      return "BUG" + "-" + taskNumber;
  }
}

const getTaskTypeIcon = (taskType) => {
  const iconKeyValuePair = Object.entries(taskTypeIcons).find(
    ([key, value]) => {
      return key === taskType; // since it's a one-liner there's no need for {} and 'return' keyword
    }
  );
  return iconKeyValuePair[1]; // index 0 is the key, index 1 is the value in which we are interested
};

const getPriorityIcon = (priority) => {
  const iconKeyValuePair = Object.entries(priorityIcons).find(
    ([key, value]) => {
      return key === priority; // since it's a one-liner there's no need for {} and 'return' keyword
    }
  );
  return iconKeyValuePair[1]; // index 0 is the key, index 1 is the value in which we are interested
};

function showAddForm() {
  const formString = `
    <div class="backdrop hide">
      <div class="modal">
        <h2 class="title">Add a new task</h2>
        <i class="close fas fa-times fa-2x"></i>
        <form id="addTaskForm" action="" method="POST">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" required>
          <label for="type">Type</label>
          <select name="type" id="type" required>
            <option disabled selected value></option>
            <option value="task">Task</option>
            <option value="improvement">Improvement</option>
            <option value="bug">Bug</option>
          </select>
          <label for="priority">Priority</label>
          <select name="priority" id="priority" required>
            <option disabled selected value></option>
            <option value="low">LOW</option>
            <option value="medium">MEDIUM</option>
            <option value="high">HIGH</option>
            <option value="urgent">URGENT</option>
          </select>
          <button class="btn-add" name="submit" type="submit">Add task</button>
        </form>
      </div>
    </div>
    `.trim();

  return compileToNode(formString);
}
//DRAG AND DROP

function dragAndDrop() {
  const lists = document.querySelectorAll(".list");
  const listItems = document.querySelectorAll(".task");

  let draggedItem = "";

  lists.forEach((valueTwo, indexTwo) => {
    const lists = valueTwo;
    const taskSection = lists.querySelectorAll(".tasks")[0];

    lists.addEventListener("dragstart", function (e) {
      draggedItem = e.target;

      setTimeout(function () {
        e.target.style.display = "none";
      }, 0);
    });

    lists.addEventListener("dragend", function (e) {
      setTimeout(function () {
        e.target.style.display = "block";
        draggedItem = "";
      }, 0);
    });

    lists.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    lists.addEventListener("dragenter", function (e) {
      e.preventDefault();
    });
    lists.addEventListener("drop", function (e) {
      taskSection.append(draggedItem);
    });
  });
}

//SEARCH INPUT

function showSearchInput() {
  if (document.querySelectorAll(".searchSection").length > 0) return null;
  else {
    const searchSection = `<div class="searchSection">
  <input type="text" name="taskname" id="textInput" placeholder="Search for task names.." onkeyup="validateSearchInput()" >
  <i class="fas fa-times-circle"></i>
  </div>`;
    const mainTitle = document
      .getElementsByTagName("h1")[0]
      .insertAdjacentHTML("afterend", searchSection);
    const removeButton = document
      .querySelector(".fa-times-circle")
      .addEventListener("click", removeSearchInput);
  }
}
function removeSearchInput() {
  const mainPage = document.getElementsByTagName("main")[0];
  mainPage.removeChild(mainPage.childNodes[2]);
}

function validateSearchInput() {
  const input = document.getElementById("textInput");
  filter = input.value.toUpperCase();
  taskList = document.querySelectorAll(".task");
  taskList.forEach((value, index) => {
    contentTask = value.querySelector(".task-title");
    if (
      value
        .querySelector(".task-title")
        .innerText.toUpperCase()
        .indexOf(filter) > -1
    ) {
      value.style.display = "";
    } else {
      value.style.display = "none";
    }
  });
}

const searchInput = (function () {
  const searchIcon = document.querySelector("#searchTask");
  searchIcon.addEventListener("click", showSearchInput);
})();

//FILTERS FUNCTIONS

function showFilters() {
  const filterSection = document.querySelector(".filterSection");
  if (window.getComputedStyle(filterSection).display === "none")
    filterSection.style.display = "block";
  else filterSection.style.display = "none";

  const removeFiltersButton = document
    .querySelector(".fa-times-circle")
    .addEventListener("click", removeFilters);
}

function removeFilters() {
  const filterSection = document.querySelector(".filterSection");
  filterSection.style.display = "none";
}

const filters = (function () {
  const filterIcon = document.querySelector("#filterTask");
  filterIcon.addEventListener("click", showFilters);
})();

//SIDEBAR TRANSITION

var mini = true;

function toggleSidebar() {
  const iconDescription = document.querySelectorAll(".iconDescription");
  const sideBar = document.getElementsByTagName("aside")[0];
  if (mini) {
    iconDescription.forEach((value, index) => {
      value.style.display = "block";
    });
    sideBar.style.width = "200px";
    mini = false;
  } else {
    iconDescription.forEach((value, index) => {
      value.style.display = "none";
    });
    sideBar.style.width = "80px";
    mini = true;
  }
}

//FETCH API

const getTasks = (function () {
  fetch("https://605dc9029386d200171bb3c2.mockapi.io/task")
    .then((response) => response.json())
    .then((data) => addFetchedTasks(data));
})();

function addFetchedTasks(data) {
  data.forEach((value, index) => {
    addTaskWithStatus(value.title, value.type, value.priority, value.status);
  });
}

function addTaskWithStatus(title, taskType, priority, status) {
  const newTask = {
    title: title,
    taskType: taskType,
    priority: priority,
    tag: getId(taskType),
  };
  tasks.backlog.push(newTask);
  const task = compileTaskTemplate(
    newTask.title,
    newTask.tag,
    newTask.taskType,
    newTask.priority,
    taskTemplate
  );
  switch (status) {
    case "backlog":
      backlog.appendChild(task);
      break;
    case "inprogress":
      inProg.appendChild(task);
      break;

    case "done":
      done.appendChild(task);
      break;
    default:
      backlog.appendChild(task);
  }
  dragAndDrop();
}
