import { format } from "date-fns";
import { findProject, updateStorage } from "../utils/storageManager.js";
import { getRandomPlaceholder, instantiateProject } from "../utils/jsonManager.js";
import { getProjectsArray, storeProjects } from "../utils/storageManager.js"
import { renderProjectSidebar } from "../views/projectView.js";

const mainSection = document.querySelector('.main-section');

function createDeleteBtn() {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X'

    return deleteBtn;
}

function deleteButtonEvent() {
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

function addNewProject() {
    const addProjectBtn = document.querySelector('.add-project-btn');

    addProjectBtn.addEventListener('click', (e) => {
        const newProject = instantiateProject(getRandomPlaceholder());
        storeProjects(newProject);
        renderSidebar();
    })

}

(function attachEventListeners() {
    deleteButtonEvent();
    fieldEditingEvent();
    addNewProject();

    renderSidebar()

})()

export { createDeleteBtn };