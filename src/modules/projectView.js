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

      projectBody.append(renderTaskSidebar(task));
    })

    projectTitle.textContent = project._title;
    projectDueDate.textContent = project._dueDate;
    projectDescription.textContent = project._description;

    sidebar.append(clone)
  });
}
renderTaskSidebar
export function renderProjectMainSection(project) {
  const mainSection = document.querySelector('.main-section');

  const projectMainWrapper = document.createElement('div');
  projectMainWrapper.classList.add('project-main-wrapper');

  const titleInput = document.createElement('div');
  titleInput.setAttribute('contenteditable', 'true');
  titleInput.setAttribute('spellcheck', 'false');
  titleInput.classList.add('project-edit-title');
  titleInput.dataset.input = 'title';
  titleInput.textContent = project.title;

  const dateInput = document.createElement('div');
  dateInput.setAttribute('contenteditable', 'true')
  dateInput.setAttribute('spellcheck', 'false')
  dateInput.dataset.input = 'dueDate';
  dateInput.classList.add('project-edit-dueDate');
  dateInput.textContent = project.dueDate;

  const descriptionInput = document.createElement('div');
  descriptionInput.setAttribute('contenteditable', 'true');
  descriptionInput.setAttribute('spellcheck', 'false');
  descriptionInput.dataset.input = 'description';
  descriptionInput.classList.add('project-edit-description')
  descriptionInput.textContent = project.description;

  const taskWrapper = document.createElement('div');
  taskWrapper.classList.add('project-task-wrapper');

  projectMainWrapper.append(titleInput, dateInput, descriptionInput, taskWrapper);

  project.projectTasks.forEach(task => {
    const taskTitleInput = document.createElement('div');
    taskTitleInput.setAttribute('contenteditable', 'true');
    taskTitleInput.setAttribute('spellcheck', 'false');
    taskTitleInput.dataset.input = 'title';
    taskTitleInput.classList.add('task-edit-title');

    taskTitleInput.textContent = task.title;

    taskWrapper.append(taskTitleInput);

    task.taskSteps.forEach(step => {
      const stepRow = document.createElement('div');
      stepRow.classList.add('step-row');

      const stepStatusInput = document.createElement('input');
      stepStatusInput.setAttribute('type', 'checkbox');
      stepStatusInput.checked = (step.status == true ? true : false)

      const stepTitleInput = document.createElement('div');
      stepTitleInput.setAttribute('contenteditable', 'true');
      stepTitleInput.setAttribute('spellcheck', 'false');
      stepTitleInput.classList.add('step-edit-title');
      stepTitleInput.textContent = step.title;

      stepRow.append(stepStatusInput, stepTitleInput)
      taskWrapper.append(stepRow);
    })
  })

  projectMainWrapper.childNodes.forEach(child => {
    child.addEventListener('keyup', (e) => {
      project[`${child.dataset.input}`] = child.textContent;
    })
  })

  mainSection.append(projectMainWrapper)

}