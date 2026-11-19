import * as jsonManager from "./jsonManager.js"

let projectsArray = [];

function checkStorage() {
    let storage;

    try {
        storage = window["localStorage"];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {

        alert("Your browser doesn't support localStorage! Sorry...");

        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        )
    }
}

function deleteProject(projectToRemoveId) {
    projectsArray.splice(projectsArray.findIndex(project => project.id === projectToRemoveId), 1)
}

function getProjectsArray() {
    return projectsArray;
}

function getProjectsArraySerialized() {
    return localStorage.getItem("projectsArray");
}

function getStorage() {
    if (checkStorage()) return localStorage
}

function storeProjects(project) {

    if (!checkStorage()) return;

    projectsArray.push(project);

    localStorage.removeItem("projectsArray");
    localStorage.setItem("projectsArray", jsonManager.serializeProject(projectsArray))

}

function updateStorage() {
    localStorage.removeItem("projectsArray");
    localStorage.setItem("projectsArray", jsonManager.serializeProject(projectsArray))
}

function findProject(id) {

    for (const project of projectsArray) {
        if (project.id == id) return project

        for (const task of project.projectTasks) {
            if (task.id == id) return task;

            for (const step of task.taskSteps) {
                if (step.id == id) return step;
            }
        }
    }
    return null;
}

function storeObjsStates(projectsStates) {
    localStorage.removeItem("objsStates");
    localStorage.setItem("objsStates", jsonManager.serializeProject(projectsStates))
};

function getObjsStates() {
    return jsonManager.deserializeProject(localStorage.getItem("objsStates"));
}

function storeActiveProject(projectId) {
    localStorage.removeItem("activeProject");
    localStorage.setItem("activeProject", projectId);
}

function getActiveProject() {
    return localStorage.getItem("activeProject");
}
export {
    checkStorage, getProjectsArray, getProjectsArraySerialized,
    storeProjects, deleteProject, getStorage, findProject, updateStorage,
    storeObjsStates, getObjsStates, storeActiveProject, getActiveProject
}