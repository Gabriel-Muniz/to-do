import { format } from "date-fns";
import { findProject, updateStorage } from "../utils/storageManager.js";
import { getProjectsArray } from "../utils/storageManager.js"
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
    const sidebarProjectsContainer = document.createElement('div');
    sidebarProjectsContainer.className = 'projectsContainer';
    sidebarProjectsContainer.textContent = '';
    const projectsArray = getProjectsArray();

    projectsArray.forEach(project => {
        sidebarProjectsContainer.appendChild(renderProjectSidebar(project));
    })

    sidebar.appendChild(sidebarProjectsContainer);
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
    deleteButtonEvent();
    fieldEditingEvent();

    renderSidebar()

})()

export { createDeleteBtn };