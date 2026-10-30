import "./styles/reset.css"
import placeHolders from "./scripts/utils/projectsPlaceholder.json"

import { Step } from "./scripts/classes/Step.js";
import { Task } from "./scripts/classes/Task.js";
import { Project } from "./scripts/classes/Project.js";

const randomProject = placeHolders[Math.floor(Math.random() * placeHolders.length)];

const project1 = new Project(randomProject.title, new Date(), randomProject.description, randomProject.priority, randomProject.projectTasks);

console.log(project1.projectLog);
console.log(project1);


