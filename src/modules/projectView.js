import { renderTaskMainSection } from "./taskView";

export function createProjectMainSection(projects) {
  const template = document.getElementById('project-template-main');

  const body = document.querySelector('body');

  projects.forEach(project => {
    const clone = document.importNode(template.content, true);

    const projectTitle = clone.querySelector('.project-title');

    const projectDueDate = clone.querySelector('.project-dueDate');

    const projectDescription = clone.querySelector('.project-description');

    const projectBody = clone.querySelector('.project-body');

    project.projectTasks.forEach(task => {
      projectBody.append(renderTaskMainSection(task));
    })

    projectTitle.textContent = project.title;
    projectDueDate.textContent = project.dueDate;
    projectDescription.textContent = project.description;
   
    body.append(clone)
  });
}