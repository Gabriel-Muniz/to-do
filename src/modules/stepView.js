export function renderStep(step) {
  const template = document.getElementById('step-template');

  const clone = document.importNode(template.content, true)

  const stepStatus = clone.querySelector('input[type="checkbox"');

  const stepTitle = clone.querySelector('.step-title');

  stepTitle.textContent = step.title;
  // taskProgress.textContent = task.progress;

  console.log(clone);

  return clone;

}