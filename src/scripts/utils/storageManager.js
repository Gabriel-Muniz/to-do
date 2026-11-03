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

(function initialLoadHandler() {
    if (!getProjectsArray()) {
        let initialProject = jsonManager.getRandomPlaceholder();
        initialProject = jsonManager.instantiateProject(initialProject);
        storeProjects(initialProject);
        return
    }

    const currentProjects = jsonManager.deserializeProject(getProjectsArray());
    projectsArray = currentProjects.map(project => {
        return jsonManager.instantiateProject(project)
    });

})()

function deleteProject(projectToRemoveId) {
    projectsArray.splice(projectsArray.findIndex(project => project.id === projectToRemoveId), 1)
}

function getProjectsArray() {
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

export { checkStorage, getProjectsArray, storeProjects, getStorage }