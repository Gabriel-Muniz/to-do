import "./styles/reset.css"
import "./styles/projects.css"
import * as jsonManager from "./scripts/utils/jsonManager.js"
import * as storageManager from "./scripts/utils/storageManager.js";
import * as domManager from "./scripts/modules/domManager.js"

const randomProject = jsonManager.getRandomPlaceholder();
const initialProject = jsonManager.instantiateProject(randomProject)

domManager.renderProject(initialProject)