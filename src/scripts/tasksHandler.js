import Tasks from "../classes/tasks";

export default function appendTasks(taskArray, index) {
  taskArray.forEach(task => {
    const project = document.querySelector(`[data-id="${index}"`);

    const taskCont = document.createElement("div");
    taskCont.classList.add("task-container");

    const taskTitle = document.createElement("ul");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.title;

    const taskDesc = document.createElement("li");
    taskDesc.classList.add("task-description");
    taskDesc.textContent = task.description;

    const taskData = document.createElement("span");
    taskData.classList.add("task-data");
    taskData.textContent = task.dueDate;

    const taskPriority = document.createElement("span");
    taskPriority.classList.add("task-priority");
    taskPriority.textContent = `\n${task.priority}`;

    taskTitle.appendChild(taskDesc);
    taskCont.appendChild(taskTitle);
    taskCont.appendChild(taskData);
    taskCont.appendChild(taskPriority);

    project.appendChild(taskCont);
  });
}
