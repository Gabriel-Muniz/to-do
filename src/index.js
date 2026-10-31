import "./styles/reset.css"
import * as jsonManager from "./scripts/utils/jsonManager.js"
import * as storageManager from "./scripts/utils/storageManager.js";

const randomProject = jsonManager.getRandomPlaceholder();
const initialProject = jsonManager.instantiateProject(randomProject)


if(!storageManager.getProjectsArray()){
    storageManager.storeProjects(jsonManager.serializeProject(initialProject))
}