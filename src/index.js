import "./styles/reset.css"

import { Step } from "./scripts/classes/Step.js";
import { Task } from "./scripts/classes/Task.js";
import { Project } from "./scripts/classes/Project.js";

const stepTest = new Step('Step', true);
const stepTest1 = new Step('Step 1', true);
const stepTest2 = new Step('Step 2');

const taskTest = new Task('Task 1', 'Today')

const projectTest = new Project('Project 1', 'Tomorrow', 'Test project', 3);
projectTest.addTask(taskTest);

taskTest.addStep(stepTest, stepTest1, stepTest2);
console.log(projectTest.projectLog);
