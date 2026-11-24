import { format } from "date-fns";
import { createDeleteBtn, createNewObjBtn, createExpandBtn } from "../components/buttons.js";
import { renderStep } from "./stepView.js";
import { getRemainingDays, formatRemainingDays } from "../utils/dateManager.js";


export function renderTask(task) {
    const editableFields = ['.task-title']

    const taskWrapper = document.createElement('li');
    taskWrapper.className = 'task-wrapper';
    taskWrapper.dataset.id = task.id;

    const taskTitle = document.createElement('h3');
    taskTitle.className = 'task-title';

    const taskDueDateWrapper = document.createElement('div');
    taskDueDateWrapper.className = 'task-dueDate dueDate';

    const taskProgress = document.createElement('span')
    taskProgress.className = 'task-progress'

    taskTitle.textContent = task.title;
    taskProgress.textContent = task.progress;

    taskDueDateWrapper.innerHTML = '<input type="text" inputmode="numeric" class="day-input" placeholder="dd" maxlength="2"/> / <input type="text" inputmode="numeric" class="month-input" placeholder="mm" maxlength="2"/> / <input type="text" inputmode="numeric" class="year-input" placeholder="yyyy" maxlength="4"/>'

    const auxDueDate = new Date(task.dueDate);

    const dayDueDate = taskDueDateWrapper.querySelector('.day-input');
    dayDueDate.value = auxDueDate.getUTCDate();

    const monthDueDate = taskDueDateWrapper.querySelector('.month-input');
    monthDueDate.value = format(auxDueDate, 'MM');

    const yearDueDate = taskDueDateWrapper.querySelector('.year-input');
    yearDueDate.value = auxDueDate.getUTCFullYear();

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
    taskWrapper.appendChild(createNewObjBtn('step'))
    taskWrapper.appendChild(createDeleteBtn())

    return taskWrapper;
}

export function renderTaskSidebar(task) {
    const taskWrapper = document.createElement('li');
    taskWrapper.className = 'task-wrapper sidebar-rendering'
    taskWrapper.dataset.id = task.id;

    const taskHeader = document.createElement('div');
    taskHeader.className = 'task-header';

    const taskBody = document.createElement('div');
    taskBody.className = 'task-body';

    const taskTitle = document.createElement('h4');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task.title;

    const taskProgress = document.createElement('span');
    taskProgress.className = 'task-progress';
    taskProgress.textContent = task.progress;

    const taskRemainingDays = document.createElement('span');
    taskRemainingDays.className = 'task-dueDate';
    taskRemainingDays.textContent = `Due date: ${formatRemainingDays(getRemainingDays(task.dueDate))}`;

    const taskStepList = document.createElement('ul');
    taskStepList.className = 'task-steps'

    task.taskSteps.forEach(step => {
        taskStepList.append(renderStep(step, true));
    })

    taskHeader.appendChild(createExpandBtn())
    taskHeader.appendChild(taskTitle);
    taskHeader.appendChild(taskProgress);

    taskBody.appendChild(taskRemainingDays);
    taskBody.appendChild(taskStepList);

    taskWrapper.appendChild(taskHeader);
    taskWrapper.appendChild(taskBody);

    return taskWrapper;
}