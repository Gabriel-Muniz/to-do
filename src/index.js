import "./styles/reset.css"
import * as jsonManager from "./scripts/utils/jsonManager.js"

const randomProject = jsonManager.getRandomPlaceholder();
const testProject = jsonManager.instantiateProject(randomProject)

console.log(testProject.projectLog)