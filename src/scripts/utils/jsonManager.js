import { Step } from "../classes/Step.js";
import { Task } from "../classes/Task.js";
import { Project } from "../classes/Project.js";

import placeHolders from "./projectsPlaceholder.json"

function getRandomPlaceholder() {
    const randomIndex = Math.floor(Math.random() * placeHolders.length);

    return placeHolders[randomIndex];
}

function serializeProject(project) {
    return JSON.stringify(project);
}

function instantiateProject(project) {

    const parsedProject = (typeof project === 'string') ? JSON.parse(project) : project;
    const parsedTasks = parsedProject.projectTasks;
    const objProject = new Project(parsedProject.title, (parsedProject.dueDate === null ? undefined : parsedProject.dueDate), parsedProject.description, parsedProject.priority);

    parsedTasks.forEach(task => {
        const newTask = new Task(task.title, (task.dueDate === null ? undefined : task.dueDate), task.status);
        const auxSteps = task.taskSteps;

        auxSteps.forEach(step => {
            newTask.addStep(new Step(step.title, step.status))
        })

        objProject.addTask(newTask);
    });

    return objProject;
}

export { getRandomPlaceholder, serializeProject, instantiateProject }