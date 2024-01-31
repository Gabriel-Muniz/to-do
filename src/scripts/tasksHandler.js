import Tasks from "../classes/tasks";

export default function appendTasks(parentProject) {
    parentProject.forEach((task) => {
    const project = document.querySelector(".project-card"); // <- First card to encounter. Has to change

    const container = document.createElement("div");
    container.classList.add("task-container");

    const title = document.createElement("h4");
    title.classList.add("task-title");

    const description = document.createElement("span");
    description.classList.add("task-description");

    const priority = document.createElement("span");
    priority.classList.add("task-priority");

    container.appendChild(title)
    container.appendChild(description)
    container.appendChild(priority)

    project.appendChild(container)

    title.textContent = task.title;
    description.textContent = task.description;
    priority.textContent = task.priority;

  });
}
