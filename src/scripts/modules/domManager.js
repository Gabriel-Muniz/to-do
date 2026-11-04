import { format } from "date-fns";

const bodyTest = document.querySelector('body');

function renderProject(project) {
    const projectWrapper = document.createElement('div');
    projectWrapper.className = 'project-wrapper';

    const projectTitle = document.createElement('h2');
    projectTitle.className = 'project-title';

    const projectDescription = document.createElement("p");
    projectDescription.className = 'project-description';


    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;

    projectWrapper.appendChild(projectTitle);
    projectWrapper.appendChild(projectDescription);

    const projectTaskList = document.createElement("ul");
    project.projectTasks.forEach(task => {
        projectTaskList.appendChild(renderTask(task));
    });

    projectWrapper.append(projectTaskList)

    bodyTest.append(projectWrapper);
}

function renderTask(task) {
    const taskWrapper = document.createElement('li');
    taskWrapper.className = 'task-wrapper';

    const taskTitle = document.createElement('h3');
    taskTitle.className = 'task-title';

    const taskDueDateWrapper = document.createElement('div');
    taskDueDateWrapper.className = 'task-dueDate';

    const taskProgress = document.createElement('span')
    taskProgress.className = 'task-status'

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
    taskWrapper.appendChild(taskDueDateWrapper);
    taskWrapper.appendChild(taskProgress);

    const taskStepList = document.createElement('ul');
    
    task.taskSteps.forEach(step => {
        taskStepList.append(renderStep(step));
    })

    taskWrapper.appendChild(taskStepList)

    return taskWrapper;
}

function renderStep(step) {
    const stepWrapper = document.createElement('li');
    const stepTitle = document.createElement('h4');


    const stepStatus = document.createElement('input');
    stepStatus.className = 'step-status';
    stepStatus.type = 'checkbox'

    stepWrapper.className = 'step-wrapper';
    stepTitle.className = 'step-title';

    stepTitle.textContent = step.title;
    stepStatus.checked = step.status;

    stepWrapper.appendChild(stepTitle);
    stepWrapper.appendChild(stepStatus);

    return stepWrapper
}

export { renderProject };