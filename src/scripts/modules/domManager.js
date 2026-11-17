import { format } from "date-fns";
import { findProject, updateStorage } from "../utils/storageManager.js";

const mainSection = document.querySelector('.main-section');

function renderProject(project) {
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

    editableFields.forEach(fieldSelector => {
        projectWrapper.querySelector(fieldSelector)
            .setAttribute('contenteditable', 'plaintext-only')
    })

    mainSection.append(projectWrapper);
}

function renderTask(task) {
    const editableFields = ['.task-title', '.day-span', '.month-span', '.year-span',]

    const taskWrapper = document.createElement('li');
    taskWrapper.className = 'task-wrapper';
    taskWrapper.dataset.id = task.id;

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
    taskWrapper.appendChild(createDeleteBtn())

    return taskWrapper;
}

function renderStep(step) {
    const stepWrapper = document.createElement('li');
    stepWrapper.className = 'step-wrapper';
    stepWrapper.dataset.id = step.id;

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
    stepWrapper.appendChild(createDeleteBtn());



    return stepWrapper
}

function createDeleteBtn() {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X'

    return deleteBtn;
}

function deleteButtonEvent() {
    // CHANCE mainSection
    mainSection.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-btn')) return;

        const deleteTarget = e.target.parentElement;
        const parent = deleteTarget.parentElement.closest([`[data-id]`]);

        removeElement(deleteTarget.dataset.id)

        let objParent = findProject(parent.dataset.id);
        objParent.removeItem(deleteTarget.dataset.id);

        updateStorage();

    })

}

function removeElement(id) {
    const elementToRemove = document.querySelector(`[data-id="${id}"]`);
    if (elementToRemove.parentNode) {
        elementToRemove.parentNode.removeChild(elementToRemove)
    }
}

function fieldEditingEvent() {
    let currentEditing;

    mainSection.addEventListener('input', (e) => {
        currentEditing = e.target.closest('[data-id]').dataset.id;
        currentEditing = findProject(currentEditing);

        let currentField = e.target.classList;
        currentField = currentField.value.split('-');
        currentField = currentField[currentField.length - 1];

        currentEditing[currentField] = (currentField == 'status') ? e.target.checked : e.target.textContent;

        if (currentField == 'status') {
            const taskWrapper = e.target.closest('.task-wrapper');
            const taskProgress = taskWrapper.querySelector('.task-progress');
            taskProgress.textContent = findProject(taskWrapper.dataset.id).progress + "%";
        }

        updateStorage();
    })
}

(function attachEventListeners() {
    let currentEditing;

    // REMEMBER TO CHANGE mainSection
    deleteButtonEvent()
    fieldEditingEvent();

})()

export { renderProject };