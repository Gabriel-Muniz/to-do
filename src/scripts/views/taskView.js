import { format } from "date-fns";
import { createDeleteBtn } from "../modules/domManager.js";
import { renderStep } from "./stepView.js";

export function renderTask(task) {
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

export function renderTaskSidebar(task) {
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper-sidebar'
    taskWrapper.dataset.id = task.id;

    const taskTitle = document.createElement('h4');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task.title;

    const taskProgress = document.createElement('span');
    taskProgress.className = 'task-progress';
    taskProgress.textContent = task.progress + "%";

    const taskStepList = document.createElement('ul');
    taskStepList.className = 'task-steps'

    task.taskSteps.forEach(step => {
        taskStepList.append(renderStep(step, true));
    })

    taskWrapper.appendChild(taskTitle);
    taskWrapper.appendChild(taskProgress);
    taskWrapper.appendChild(taskStepList);

    return taskWrapper;
}