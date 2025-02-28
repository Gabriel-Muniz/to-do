import { renderStep } from "./stepView";
import { renderTaskSidebar } from "./taskView";

export function renderProjectSidebar(projects) {
  const template = document.getElementById('project-template-main');

  const sidebar = document.querySelector('.sidebar');

  projects.forEach(project => {
    const clone = document.importNode(template.content, true);

    const projectTitle = clone.querySelector('.project-title');

    const projectDueDate = clone.querySelector('.project-dueDate');

    const projectDescription = clone.querySelector('.project-description');

    const projectBody = clone.querySelector('.project-body');

    project.projectTasks.forEach(task => {
      projectBody.append(renderTaskSidebar(task));
    })

    projectTitle.textContent = project.title;
    projectDueDate.textContent = project.dueDate;
    projectDescription.textContent = project.description;

    sidebar.append(clone)
  });
}

export function renderProjectMainSection(project) {
  const mainSection = document.querySelector('.main-section');

  const projectMainWrapper = document.createElement('div');

  projectMainWrapper.classList.add('project-main-wrapper');

  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.value = project.title;

  const dateInput = document.createElement('input');
  dateInput.setAttribute('type', 'date');

  const descriptionInput = document.createElement('textarea');
  descriptionInput.value = project.description;

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('project-tasks-container')

  project.projectTasks.forEach(task => {
    const taskInputTitle = document.createElement('input');
    taskInputTitle.setAttribute('type', 'text');
    taskInputTitle.value = task.title;

    taskContainer.append(taskInputTitle);

    task.taskSteps.forEach(step => {
      const stepWrapper = document.createElement('div');
      stepWrapper.classList.add('step-wrapper');
      const stepCheckbox = document.createElement('input');
      stepCheckbox.setAttribute('type', 'checkbox')
      stepCheckbox.checked = (step.status) ? true: false;

      const stepInputTitle = document.createElement('input');
      stepInputTitle.setAttribute('type', 'text');
      stepInputTitle.value = step.title

      stepWrapper.append(stepCheckbox, stepInputTitle);

      taskContainer.append(stepWrapper)
    })

  })

  projectMainWrapper.append(titleInput, dateInput, descriptionInput, taskContainer);

  mainSection.append(projectMainWrapper)
}