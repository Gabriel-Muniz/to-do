import { renderStep } from "./stepView";

export function renderTaskMainSection(task) {
  const template = document.getElementById('task-template-main');


  const clone = document.importNode(template.content, true)

  const taskTitle = clone.querySelector('.task-title');

  const taskProgress = clone.querySelector('.task-progress');

  const taskSteps = clone.querySelector('.task-steps');

  task.taskSteps.forEach(step => {
    taskSteps.append(renderStep(step))
  });

  taskTitle.textContent = task.title;
  taskProgress.textContent = task.progress;
  

  console.log(clone);
  
  return clone;

}