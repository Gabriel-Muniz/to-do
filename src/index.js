import "./styles/reset.css"
import "./styles/projects.css"
import "./styles/home.css"
import * as jsonManager from "./scripts/utils/jsonManager.js"
import * as storageManager from "./scripts/utils/storageManager.js";
import * as domManager from "./scripts/modules/domManager.js"
import { renderProject } from "./scripts/views/projectView.js";

// const randomProject = jsonManager.getRandomPlaceholder();
// const initialProject = jsonManager.instantiateProject(randomProject)
let firstProject = storageManager.getProjectsArray();
firstProject = jsonManager.deserializeProject(firstProject)[0]
firstProject = jsonManager.instantiateProject(firstProject)

const mainSection = document.querySelector('.main-section');
mainSection.appendChild(renderProject(firstProject))