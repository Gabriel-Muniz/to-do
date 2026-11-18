import { format } from "date-fns";
import { findProject, updateStorage } from "../utils/storageManager.js";
import { getRandomPlaceholder, instantiateProject } from "../utils/jsonManager.js";
import { getProjectsArray, storeProjects, deleteProject } from "../utils/storageManager.js"
import { renderProject, renderProjectSidebar } from "../views/projectView.js";

const mainSection = document.querySelector('.main-section');

function createDeleteBtn() {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X'

    return deleteBtn;
}

function deleteButtonEvent() {
    const body = document.querySelector('body');

    body.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-btn')) return;

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

        if(deleteTarget.classList.contains('step-wrapper')){
            updateTaskProgress(parent.dataset.id);
        }

    })
}



function renderSidebar() {
    const sidebar = document.querySelector('.sidebar');
    let sidebarProjectsContainer = document.querySelector('.projects-container');


    if (sidebarProjectsContainer) {
        sidebarProjectsContainer.innerHTML = '';
    } else {
        sidebarProjectsContainer = document.createElement('div');
        sidebarProjectsContainer.className = 'projects-container';

    }
    const projectsArray = getProjectsArray();

    projectsArray.forEach(project => {
        sidebarProjectsContainer.appendChild(renderProjectSidebar(project));
    })

    sidebar.appendChild(sidebarProjectsContainer);
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

function projectChangingEvent() {
    const sidebar = document.querySelector('.sidebar');
    const mainSection = document.querySelector('.main-section');

    sidebar.addEventListener('click', (e) => {
        const auxClosestProject = e.target.closest('.project-wrapper.sidebar-rendering');
        const isDeleteBtn = e.target.classList.contains('delete-btn');

        if (!auxClosestProject || isDeleteBtn) return;
        mainSection.innerHTML = '';

        mainSection.appendChild(renderProject(findProject(auxClosestProject.dataset.id)))
        console.log(e.target);

    })
}

function fieldEditingEvent() {
    let currentEditing;

    const body = document.querySelector('body');

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
        auxTemp.textContent = findProject(taskId).progress + "%";
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

(function attachEventListeners() {
    deleteButtonEvent();
    fieldEditingEvent();
    addNewProject();
    projectChangingEvent();


    renderSidebar()

})()

export { createDeleteBtn };