import { renderStep } from "./stepView";

export function renderTaskSidebar(task) {
  const template = document.getElementById('task-template-main');


  const clone = document.importNode(template.content, true)

  const taskTitle = clone.querySelector('.task-title');

  const taskProgress = clone.querySelector('.task-progress');

  const taskSteps = clone.querySelector('.task-steps');

  task._taskSteps.forEach(step => {
    taskSteps.append(renderStep(step))
  });

  taskTitle.textContent = task._title;
  taskProgress.textContent = `${task._progress}%`;

  return clone;

}