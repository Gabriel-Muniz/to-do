import { renderTaskSidebar } from "./taskView";

export function renderProjectSidebar(projects) {
  const template = document.getElementById('project-template-main');

  const sidebar = document.querySelector('.sidebar');


  projects.forEach((project, index) => {
    const clone = document.importNode(template.content, true);

    const projectWrapper = clone.querySelector('.project-wrapper');

    projectWrapper.setAttribute('data-pj-index', `${index}`)

    const projectTitle = clone.querySelector('.project-title');

    const projectDueDate = clone.querySelector('.project-dueDate');

    const projectDescription = clone.querySelector('.project-description');

    const projectBody = clone.querySelector('.project-body');


    project._projectTasks.forEach(task => {

      projectBody.append(renderTaskSidebar(task, index));
    })

    projectTitle.textContent = project._title;
    projectDueDate.textContent = project._dueDate;
    projectDescription.textContent = project._description;

    sidebar.append(clone)
  });
}
export function renderProjectMainSection(project, index) {
  const mainSection = document.querySelector('.main-section');

  mainSection.innerHTML = '';

  const projectMainWrapper = document.createElement('div');
  projectMainWrapper.classList.add('project-main-wrapper');
  projectMainWrapper.setAttribute('data-pj-index', `${index}`)

  const titleInput = document.createElement('div');
  titleInput.setAttribute('contenteditable', 'true');
  titleInput.setAttribute('spellcheck', 'false');
  titleInput.classList.add('project-edit-title');
  titleInput.classList.add('project');
  titleInput.dataset.input = 'title';
  titleInput.textContent = project._title;

  const dateInput = document.createElement('div');
  dateInput.setAttribute('contenteditable', 'true')
  dateInput.setAttribute('spellcheck', 'false')
  dateInput.dataset.input = 'dueDate';
  dateInput.classList.add('project-edit-dueDate');
  dateInput.classList.add('project');
  dateInput.textContent = project._dueDate;

  const descriptionInput = document.createElement('div');
  descriptionInput.setAttribute('contenteditable', 'true');
  descriptionInput.setAttribute('spellcheck', 'false');
  descriptionInput.dataset.input = 'description';
  descriptionInput.classList.add('project-edit-description')
  descriptionInput.classList.add('project')
  descriptionInput.textContent = project._description;

  projectMainWrapper.append(titleInput, dateInput, descriptionInput);

  project._projectTasks.forEach((task, taskIndex) => {
    const taskTitleInput = document.createElement('div');
    taskTitleInput.setAttribute('contenteditable', 'true');
    taskTitleInput.setAttribute('spellcheck', 'false');
    taskTitleInput.dataset.input = 'title';
    taskTitleInput.classList.add('task-edit-title');
    taskTitleInput.classList.add('task');

    taskTitleInput.textContent = task._title;

    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('project-task-wrapper');
    taskWrapper.setAttribute('data-tk-index', `${taskIndex}`);

    taskWrapper.append(taskTitleInput);

    task._taskSteps.forEach((step, stepIndex) => {
      const stepRow = document.createElement('div');
      stepRow.classList.add('step-row');
      stepRow.setAttribute('data-st-index', `${stepIndex}`)

      const stepStatusInput = document.createElement('input');
      stepStatusInput.setAttribute('type', 'checkbox');
      stepStatusInput.checked = (step._status == true ? true : false)

      const stepTitleInput = document.createElement('div');
      stepTitleInput.setAttribute('contenteditable', 'true');
      stepTitleInput.setAttribute('spellcheck', 'false');
      stepTitleInput.setAttribute('data-input', 'title');
      stepTitleInput.classList.add('step-edit-title');
      stepTitleInput.classList.add('step');
      stepTitleInput.textContent = step._title;

      stepRow.append(stepStatusInput, stepTitleInput)
      taskWrapper.append(stepRow);
    })
    projectMainWrapper.append(taskWrapper)
  })
  mainSection.append(projectMainWrapper)

}