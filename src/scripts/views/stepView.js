import { createDeleteBtn } from "../modules/domManager.js";
export function renderStep(step, isSidebar = false) {

    const stepWrapper = document.createElement('li');
    stepWrapper.className = 'step-wrapper';
    stepWrapper.dataset.id = step.id;

    const stepTitle = document.createElement('label');
    stepTitle.setAttribute('contenteditable', "plaintext-only");

    const stepStatus = document.createElement('input');
    stepStatus.className = 'step-status';
    stepStatus.type = 'checkbox'

    stepTitle.className = 'step-title';

    stepTitle.textContent = step.title;
    stepStatus.checked = step.status;

    stepWrapper.appendChild(stepTitle);
    stepWrapper.appendChild(stepStatus);
    if (!isSidebar) {
        stepWrapper.appendChild(createDeleteBtn());
    }

    return stepWrapper
}