import { Step } from "../classes/Step.js";
import { Task } from "../classes/Task.js";
import { Project } from "../classes/Project.js";

import projectsPlaceholders from "./projectsPlaceholder.json";
import tasksPlaceholders from "./tasksPlaceholders.json";
import stepsPlaceholders from "./stepsPlaceholders.json";

function getRandomPlaceholder(placeholderType) {
  const randomIndex = Math.floor(Math.random() * 5);

  switch (placeholderType) {
    case "project":
      return instantiateProject(projectsPlaceholders[randomIndex]);
    case "task":
      return instantiateTask(tasksPlaceholders[randomIndex]);
    case "step":
      return instantiateStep(stepsPlaceholders[randomIndex]);
    default:
      alert("Something went wrong");
      break;
  }
}

function serializeProject(project) {
  return JSON.stringify(project);
}

function deserializeProject(string) {
  return JSON.parse(string);
}

function instantiateProject(project) {
  const parsedProject =
    typeof project === "string" ? JSON.parse(project) : project;
  const parsedTasks = parsedProject.projectTasks;
  const objProject = new Project(
    parsedProject.id,
    parsedProject.title,
    parsedProject.dueDate,
    parsedProject.description,
    parsedProject.priority,
  );

  parsedTasks.forEach((task) => {
    objProject.addTask(instantiateTask(task));
  });

  return objProject;
}

function instantiateTask(task) {
  const newTask = new Task(task.id, task.title, task.dueDate, task.status);
  const auxSteps = task.taskSteps;

  auxSteps.forEach((step) => {
    newTask.addStep(instantiateStep(step));
  });

  return newTask;
}

function instantiateStep(step) {
  const newStep = new Step(step.id, step.title, step.status);
  return newStep;
}

export {
  getRandomPlaceholder,
  serializeProject,
  deserializeProject,
  instantiateProject,
};
