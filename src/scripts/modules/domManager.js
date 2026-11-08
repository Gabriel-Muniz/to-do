import { format } from "date-fns";
import { findProject, updateStorage } from "../utils/storageManager.js";

const bodyTest = document.querySelector('body');

function renderProject(project) {
    const editableFields = ['.project-title', '.project-description', '.day-span', '.month-span', '.year-span']

    const projectWrapper = document.createElement('div');
    projectWrapper.className = 'project-wrapper';
    projectWrapper.dataset.projectId = project.id;

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

    editableFields.forEach(fieldSelector => {
        projectWrapper.querySelector(fieldSelector)
            .setAttribute('contenteditable', 'plaintext-only')
    })

    bodyTest.append(projectWrapper);
}

function renderTask(task) {
    const editableFields = ['.task-title', '.day-span', '.month-span', '.year-span',]

    const taskWrapper = document.createElement('li');
    taskWrapper.className = 'task-wrapper';
    taskWrapper.dataset.taskId = task.id;

    const taskTitle = document.createElement('h3');
    taskTitle.className = 'task-title';

    const taskDueDateWrapper = document.createElement('div');
    taskDueDateWrapper.className = 'task-dueDate';

    const taskProgress = document.createElement('span')
    taskProgress.className = 'task-progress'

    taskTitle.textContent = task.title;
    taskProgress.textContent = `${task.progress}%`;

    taskDueDateWrapper.innerHTML = '<span class="day-span"></span> / <span class="month-span"></span> / <span class="year-span"></span>'

    const auxDueDate = new Date(task.dueDate);

    const dayDueDate = taskDueDateWrapper.querySelector('.day-span');
    dayDueDate.textContent = format(auxDueDate, 'dd');

    const monthDueDate = taskDueDateWrapper.querySelector('.month-span');
    monthDueDate.textContent = format(auxDueDate, 'MM');

    const yearDueDate = taskDueDateWrapper.querySelector('.year-span');
    yearDueDate.textContent = format(auxDueDate, 'yyyy');


    taskWrapper.appendChild(taskTitle);
    taskWrapper.appendChild(taskProgress);
    taskWrapper.appendChild(taskDueDateWrapper);

    const taskStepList = document.createElement('ul');
    taskStepList.className = 'task-steps'

    task.taskSteps.forEach(step => {
        taskStepList.append(renderStep(step));
    })

    editableFields.forEach(fieldSelector => {
        taskWrapper.querySelector(fieldSelector)
            .setAttribute('contentEditable', "plaintext-only");
    })

    taskWrapper.appendChild(taskStepList)

    return taskWrapper;
}

function renderStep(step) {
    const stepWrapper = document.createElement('li');
    stepWrapper.className = 'step-wrapper';
    stepWrapper.dataset.stepId = step.id;

    const stepTitle = document.createElement('label');
    stepTitle.setAttribute('contenteditable', "plaintext-only");

    const stepStatus = document.createElement('input');
    stepStatus.className = 'step-status';
    stepStatus.type = 'checkbox'

    stepTitle.className = 'step-title';

    stepTitle.textContent = step.title;
    stepStatus.checked = step.status;

    stepWrapper.appendChild(stepTitle);
    stepWrapper.appendChild(stepStatus);

    return stepWrapper
}

(function attachEventListeners() {
    let currentEditing;

    // REMEMBER TO CHANGE BODYTEST
    bodyTest.addEventListener('input', (e) => {
        let auxProject = e.target.closest('.project-wrapper');
        let auxTask = e.target.closest('.task-wrapper');
        let auxStep = e.target.closest('.step-wrapper');

        if (e.target.closest('.project-wrapper')) {
            auxProject = auxProject.dataset.projectId;
        }

        if (e.target.closest('.task-wrapper')) {
            auxTask = auxTask.dataset.taskId;
        }

        if (e.target.closest('.step-wrapper')) {
            auxStep = auxStep.dataset.stepId;
        }

        currentEditing = findProject(auxProject, auxTask, auxStep); //Sends id's to return respective project, task or step

        let currentField = e.target.classList;
        currentField = currentField.value.split('-');
        currentField = currentField[currentField.length - 1];

        currentEditing[currentField] = (currentField == 'status') ? e.target.checked : e.target.textContent;

        if (auxStep && currentField == 'status') {
            const taskWrapper = document.querySelector(`[data-task-id="${auxTask}"`);
            const taskProgress = taskWrapper.querySelector('.task-progress');
            taskProgress.textContent = findProject(auxProject, auxTask).progress + '%';
        };

        updateStorage();
    })
})()

export { renderProject };