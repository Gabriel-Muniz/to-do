import Project, { projectArray } from "../classes/projects";
import appendTasks from "./tasksHandler";

export default function appendProjects() {
  projectArray.forEach((project) => {
    const content = document.querySelector(".right-section");

    const container = document.createElement("div");
    container.classList.add("project-card");

    const title = document.createElement("h2");
    title.classList.add("project-title");
    title.textContent = project.title;

    container.appendChild(title);
    content.appendChild(container);

    appendTasks(project.taskArray); //Calls taskHandler function
  });
}
