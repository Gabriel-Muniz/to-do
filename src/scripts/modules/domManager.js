import { findProject, updateStorage } from "../utils/storageManager.js";
import { getRandomPlaceholder, instantiateProject, deserializeProject } from "../utils/jsonManager.js";
import { getProjectsArray, storeProjects, deleteProject, getObjsStates, storeObjsStates, getProjectsArraySerialized, getActiveProject, storeActiveProject } from "../utils/storageManager.js"
import { renderProject, renderProjectSidebar } from "../views/projectView.js";
import { getThreeDaysFromNow, getCurrentMonth, getCurrentYear, checkMonth, getMaxDay, checkDate } from "../utils/dateManager.js";

const body = document.querySelector('body');
const sidebar = document.querySelector('.sidebar');
const mainSection = document.querySelector('.main-section');
const sidebarProjectsContainer = document.querySelector('.projects-container');

function expandProjectEvent() {
    sidebar.addEventListener('click', (e) => {
        const isExpandBtn = e.target.closest('.expand-btn');

        if (!isExpandBtn) return;

        const objWrapper = e.target.closest('[data-id]');

        objWrapper.classList.toggle('expanded');

        setObjsState();
    })
}

function deleteButtonEvent() {
    body.addEventListener('click', (e) => {
        if (!e.target.closest('.delete-btn')) return;

        const deleteTarget = e.target.parentElement;
        const parent = deleteTarget.parentElement.closest([`[data-id]`]);

        removeElement(deleteTarget.dataset.id)

        if (!parent) {
            deleteProject(deleteTarget.dataset.id)
        } else {
            let objParent = findProject(parent.dataset.id);
            objParent.removeItem(deleteTarget.dataset.id);
        }

        updateStorage();

        if (deleteTarget.classList.contains('step-wrapper')) {
            updateTaskProgress(parent.dataset.id);
        }

        setObjsState();
    })
}

function addButtonEvent() {
    body.addEventListener('click', (e) => {
        if (!e.target.closest('.add-btn')) return;

        const parent = e.target.parentNode;

        if (parent.classList.contains('project-wrapper')) {
            const project = findProject(parent.dataset.id);
            project.addTask(getRandomPlaceholder('task'));
        }

        if (parent.classList.contains('task-wrapper')) {
            const task = findProject(parent.dataset.id);
            task.addStep(getRandomPlaceholder('step'));

            updateTaskProgress();
        }

        updateRenderedProject();
        updateStorage();
        renderSidebar();
    })
}

function updateRenderedProject() {
    const currentRenderedProject = mainSection.querySelector('.project-wrapper').dataset.id;
    renderMainSectionProject(currentRenderedProject);

}

function renderMainSectionProject(projectId) {
    mainSection.innerHTML = '';
    const projectToRender = findProject(projectId);

    if (getProjectsArray().length == 0) {
        storeActiveProject(null);
        return;
    };

    if (!projectToRender) {
        const firstProject = getProjectsArray()[0];

        console.log(firstProject);

        mainSection.appendChild(renderProject(firstProject));
        return
    }
    mainSection.appendChild(renderProject(projectToRender));
}

function renderSidebar() {
    if (sidebarProjectsContainer.hasChildNodes()) {
        sidebarProjectsContainer.innerHTML = '';
    }

    const projectsArray = getProjectsArray();

    projectsArray.forEach(project => {
        sidebarProjectsContainer.appendChild(renderProjectSidebar(project));
    })

    if (getObjsStates()) {
        loadProjectsStates();
    }
}

function removeElement(id) {
    const elementToRemove = document.querySelectorAll(`[data-id="${id}"]`);

    elementToRemove.forEach(element => {
        if (element.parentNode) {
            console.log(element.parentNode);
            element.parentNode.removeChild(element);
        }
    })

}

function setObjsState() {

    const expandableElements = Array.from(sidebar.querySelectorAll('.sidebar-rendering'));

    const objsState = expandableElements.map(obj => {
        return {
            id: obj.dataset.id,
            expanded: (obj.classList.contains('expanded')) ? true : false,
        }
    })

    storeObjsStates(objsState)
}

function loadProjectsStates() {
    const projectsState = getObjsStates();

    for (const project of projectsState) {
        const currentProject = sidebarProjectsContainer.querySelector(`[data-id="${project.id}"]`)

        if (project.expanded) {
            currentProject.classList.add('expanded');
        }
    }
}

function projectChangingEvent() {
    sidebar.addEventListener('click', (e) => {
        const auxClosestProject = e.target.closest('.project-wrapper.sidebar-rendering');
        const isDeleteBtn = e.target.closest('.delete-btn');
        const isExpandBtn = e.target.closest('.expand-btn');

        if (!auxClosestProject || isDeleteBtn || isExpandBtn) return;
        mainSection.innerHTML = '';

        renderMainSectionProject(auxClosestProject.dataset.id)
        console.log(e.target);

        storeActiveProject(auxClosestProject.dataset.id);
    })
}

function fieldEditingEvent() {
    let currentEditing;
    let auxInputValue;

    body.addEventListener('input', (e) => {
        currentEditing = e.target.closest('[data-id]').dataset.id;
        currentEditing = findProject(currentEditing);

        let currentField = e.target.classList;
        currentField = currentField.value.split('-');
        currentField = currentField[currentField.length - 1];

        currentEditing[currentField] = (currentField == 'status') ? e.target.checked : e.target.textContent;

        if (currentField == 'status') {
            const auxSelector = e.target.closest('[data-id]');
            syncCheckbox(auxSelector.dataset.id, currentEditing[currentField]);
            const taskWrapper = e.target.closest('.task-wrapper');
            updateTaskProgress(taskWrapper.dataset.id)
        }

        renderSidebar();
        updateStorage();
    })

    body.addEventListener('keydown', (e) => {
        if (!e.target.closest('.dueDate')) return;

        if (!checkKeyDown(e)) {
            e.preventDefault();
            return;
        };
    })

    mainSection.addEventListener('change', (e) => {
        if (!e.target.closest('.project-priority')) return;

        const currentProject = findProject(e.target.closest('.project-wrapper').dataset.id);

        if (Number(e.target.value) >= 1 && Number(e.target.value) <= 3) {
            currentProject.priority = Number(e.target.value);
        }

        updateStorage();
        renderSidebar();
    })

    body.addEventListener('change', (e) => {
        if (!e.target.closest('.dueDate')) return;

        const dueDateWrapper = e.target.parentNode;
        const dayInput = dueDateWrapper.querySelector('.day-input');
        const monthInput = dueDateWrapper.querySelector('.month-input');
        const yearInput = dueDateWrapper.querySelector('.year-input');

        if (e.target === dayInput) {
            if (dayInput.value <= 0) {
                dayInput.value = getThreeDaysFromNow().day;
            }

            if (dayInput.value > getMaxDay(monthInput.value, yearInput.value)) {
                dayInput.value = getMaxDay(monthInput.value, yearInput.value);
            }
        }

        if (e.target === monthInput) {
            monthInput.value = (!checkMonth(monthInput.value)) ? getCurrentMonth() : monthInput.value;
        }

        if (e.target === yearInput) {
            yearInput.value = (yearInput.value < getCurrentYear()) ? getCurrentYear() : yearInput.value;
        }

        let auxDay = Number(dayInput.value);
        let auxMonth = Number(monthInput.value) - 1;
        let auxYear = Number(yearInput.value);

        if (!checkDate(auxYear, auxMonth, auxDay)) {
            const theeDayFromNow = getThreeDaysFromNow()
            dayInput.value = auxDay = theeDayFromNow.day;
            monthInput.value = auxMonth = theeDayFromNow.month;
            yearInput.value = auxYear = theeDayFromNow.year;
        }

        let auxUTCDate = new Date(Date.UTC(auxYear, auxMonth, auxDay)).toISOString();
        const objDueDate = findProject(e.target.closest("[data-id]").dataset.id);
        objDueDate.dueDate = auxUTCDate;

        updateStorage();
        renderSidebar();
    })

    body.addEventListener('compositionstart', (e) => {
        if (!e.target.closest('.dueDate')) return;

        auxInputValue = e.target.value;
    })

    body.addEventListener('compositionend', (e) => {
        if (!e.target.closest('.dueDate')) return;
        e.target.value = auxInputValue;
    })


}

function checkKeyDown(keyDownEvent) {
    let isKeyDownValid = false;
    const auxEventKey = keyDownEvent.key.toLocaleLowerCase();

    const allowedKeys = [
        'Tab',
        'Control',
        'Enter',
        'Delete',
        'Shift',
        'Backspace',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'ArrowUp',
        'ArrowRight',
        'ArrowDown',
        'ArrowLeft',
    ]

    const shortcutKeys = ['a', 'c', 'v', 'x', 'r', 'f', 'delete'];

    if (allowedKeys.includes(keyDownEvent.key)) {
        isKeyDownValid = true;
    }

    if ((shortcutKeys.includes(auxEventKey)) && keyDownEvent.ctrlKey) {
        isKeyDownValid = true;
    }

    if (keyDownEvent.key.match(new RegExp(/^[0-9]/))) {
        isKeyDownValid = true;
    }

    return isKeyDownValid;
}

function syncCheckbox(checkboxSelector, value) {
    const checkboxes = document.querySelectorAll(`[data-id="${checkboxSelector}"]`);

    for (const checkbox of checkboxes) {
        const auxTemp = checkbox.querySelector('input');
        auxTemp.checked = value;
    }
}

function updateTaskProgress(taskId) {
    const taskWrapper = document.querySelectorAll(`[data-id="${taskId}"]`);

    for (const task of taskWrapper) {
        const auxTemp = task.querySelector('.task-progress');
        auxTemp.textContent = findProject(taskId).progress;
    }
}

function addNewProject() {
    const addProjectBtn = document.querySelector('.add-project-btn');

    addProjectBtn.addEventListener('click', (e) => {
        const newProject = getRandomPlaceholder('project');
        storeProjects(newProject);
        renderSidebar();
    })

}

function attachEventListeners() {
    deleteButtonEvent();
    addButtonEvent();
    expandProjectEvent()
    fieldEditingEvent();
    addNewProject();
    projectChangingEvent();
}

(function initialLoadHandler() {
    attachEventListeners();

    if (!getProjectsArraySerialized()) {
        const initialProject = getRandomPlaceholder('project');
        storeProjects(initialProject);
        storeActiveProject(initialProject.id);
        renderMainSectionProject(initialProject.id)
        renderSidebar();
        setObjsState();

    } else {
        const currentProjects = deserializeProject(getProjectsArraySerialized());

        currentProjects.forEach(project => {
            storeProjects(instantiateProject(project));
        })

        renderMainSectionProject(getActiveProject())
        renderSidebar()
    }
    // loadProjectsStates();
})()