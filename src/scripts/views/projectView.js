import { format } from "date-fns";
import { renderTask, renderTaskSidebar } from "./taskView.js";
import { createDeleteBtn, createNewObjBtn, createExpandButton } from "../modules/domManager.js";

export function renderProject(project) {
    const editableFields = ['.project-title', '.project-description', '.day-span', '.month-span', '.year-span']

    const projectWrapper = document.createElement('div');
    projectWrapper.className = 'project-wrapper';
    projectWrapper.dataset.id = project.id;

    const projectTitle = document.createElement('h2');
    projectTitle.className = 'project-title';

    const projectDescription = document.createElement("p");
    projectDescription.className = 'project-description';

    const projectDueDateWrapper = document.createElement('div');
    projectDueDateWrapper.className = 'project-dueDate';

    projectDueDateWrapper.innerHTML = '<span class="day-span"></span> / <span class="month-span"></span> / <span class="year-span"></span>';
    const auxDueDate = new Date(project.dueDate);

    const dayDueDate = projectDueDateWrapper.querySelector('.day-span');
    dayDueDate.textContent = format(auxDueDate, 'dd');

    const monthDueDate = projectDueDateWrapper.querySelector('.month-span');
    monthDueDate.textContent = format(auxDueDate, 'MM');

    const yearDueDate = projectDueDateWrapper.querySelector('.year-span');
    yearDueDate.textContent = format(auxDueDate, 'yyyy');

    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;

    projectWrapper.appendChild(projectTitle);
    projectWrapper.appendChild(projectDueDateWrapper);
    projectWrapper.appendChild(projectDescription);

    const projectTaskList = document.createElement("ul");
    projectTaskList.className = 'project-tasks'
    project.projectTasks.forEach(task => {
        projectTaskList.appendChild(renderTask(task));
    });

    projectWrapper.append(projectTaskList)
    projectWrapper.append(createNewObjBtn('task'))

    editableFields.forEach(fieldSelector => {
        projectWrapper.querySelector(fieldSelector)
            .setAttribute('contenteditable', 'plaintext-only')
    })

    return projectWrapper;
}

export function renderProjectSidebar(project) {
    const projectWrapper = document.createElement('div');
    projectWrapper.className = 'project-wrapper sidebar-rendering';
    projectWrapper.dataset.id = project.id;

    const projectTitle = document.createElement('h3');
    projectTitle.className = 'project-title';
    projectTitle.textContent = project.title;

    const projectPriority = document.createElement('span')
    projectPriority.className = 'project-priority';
    projectPriority.textContent = project.priority;

    const projectTaskList = document.createElement('ul');
    projectTaskList.className = 'project-tasks';

    project.projectTasks.forEach(task => {
        projectTaskList.appendChild(renderTaskSidebar(task));
    });

    projectWrapper.appendChild(createExpandButton());
    projectWrapper.appendChild(projectTitle);
    projectWrapper.appendChild(projectPriority);
    projectWrapper.appendChild(projectTaskList);
    projectWrapper.appendChild(createDeleteBtn());

    return projectWrapper
}