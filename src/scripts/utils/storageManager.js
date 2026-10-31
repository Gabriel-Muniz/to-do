function checkStorage() {
    let storage;

    try {
        storage = window["localStorage"];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        )
    }
}

function getProjectsArray() {
    return localStorage.getItem("projectsArray");
}

function getStorage() {
    if (checkStorage()) {
        return localStorage;
    } else {
        alert("Your browser doesn't support localStorage! Sorry...");
    }
}

function storeProjects(string) {

    if (!checkStorage()) return;
    if (typeof string === 'undefined') return;

    if (localStorage.getItem("projectsArray")) {
        localStorage.removeItem("projectsArray");
    }

    localStorage.setItem("projectsArray", string)
}

export { checkStorage, getProjectsArray, storeProjects, getStorage }