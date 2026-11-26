import { format} from "date-fns";
import { renderTask, renderTaskSidebar } from "./taskView.js";
import { createDeleteBtn, createNewObjBtn, createExpandBtn } from "../components/buttons.js";
import { getRemainingDays, formatRemainingDays } from "../utils/dateManager.js";

export function renderProject(project) {
    const editableFields = ['.project-title', '.project-description']

    const projectWrapper = document.createElement('div');
    projectWrapper.className = 'project-wrapper';
    projectWrapper.dataset.id = project.id;

    const projectTitle = document.createElement('h2');
    projectTitle.className = 'project-title';

    const projectDescription = document.createElement("p");
    projectDescription.className = 'project-description';

    const projectDueDateWrapper = document.createElement('div');
    projectDueDateWrapper.className = 'project-dueDate dueDate';

    projectDueDateWrapper.innerHTML = '<input type="text" inputmode="numeric" class="day-input" placeholder="dd" maxlength="2"/> / <input type="text" inputmode="numeric" class="month-input" placeholder="mm" maxlength="2"/> / <input type="text" inputmode="numeric" class="year-input" placeholder="yyyy" maxlength="4"/>';
    const auxDueDate = new Date(project.dueDate);

    const dayDueDate = projectDueDateWrapper.querySelector('.day-input');
    dayDueDate.value = auxDueDate.getUTCDate();

    const monthDueDate = projectDueDateWrapper.querySelector('.month-input');
    monthDueDate.value = format(auxDueDate, 'MM');

    const yearDueDate = projectDueDateWrapper.querySelector('.year-input');
    yearDueDate.value = auxDueDate.getUTCFullYear();

    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;


    const projectPriority = document.createElement('div');
    projectPriority.className = 'project-priority';

    projectPriority.innerHTML = `
        <label for="priority-select">Priority:</label>
        
        <select name="" id="priority-select">
            <option value="1" >High</option>
            <option value="2" >Medium</option>
            <option value="3" >Low</option>
        </select>
    `
    const priorityOptions = projectPriority.querySelectorAll('option');

    const OPTION_BY_PRIORITY = {
        1: priorityOptions[0],
        2: priorityOptions[1],
        3: priorityOptions[2]
    }

    OPTION_BY_PRIORITY[project.priority].setAttribute('selected', true);

    projectWrapper.appendChild(projectTitle);
    projectWrapper.appendChild(projectPriority);
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

    const projectRemainingDays = document.createElement('span');
    projectRemainingDays.className = 'project-dueDate';
    projectRemainingDays.textContent = `Due date: ${formatRemainingDays(getRemainingDays(project.dueDate))}`;

    const PRIORITY_LABELS = {
        1: 'High',
        2: 'Medium',
        3: 'Low'
    }

    projectPriority.textContent = `Priority: ${PRIORITY_LABELS[project.priority]}`;

    const projectTaskList = document.createElement('ul');
    projectTaskList.className = 'project-tasks';

    project.projectTasks.forEach(task => {
        projectTaskList.appendChild(renderTaskSidebar(task));
    });

    projectWrapper.appendChild(createExpandBtn());
    projectWrapper.appendChild(projectTitle);
    projectWrapper.appendChild(projectPriority);
    projectWrapper.appendChild(projectRemainingDays);
    projectWrapper.appendChild(projectTaskList);
    projectWrapper.appendChild(createDeleteBtn());

    return projectWrapper
}