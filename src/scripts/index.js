import "../styles/reset.css"
import Project from "./Project.js";
import Task from "./Task.js";
import Step from "./Step.js";
console.log('%c Working', 'color: lightgreen');

let project1 = new Project('Workout', 'Workout for 300 minutes this month.', '12/02/2025');

let task1 = new Task('Prepare routine', '11/02/2025');

let step1 = new Step('Search routine video', true);
let step2 = new Step('Save routine on watch later', true);
let step3 = new Step('Prepare enviroment', true);

project1.addTaskToProject(task1);
task1.addStepToTask(step1, step2, step3);

project1 = JSON.stringify(project1);
// console.log(project1);

task1.calcProgress()
