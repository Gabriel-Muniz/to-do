import { renderProjectMainSection, renderProjectSidebar } from "../modules/projectView.js";

const projectsLocalStore = JSON.parse(localStorage.getItem('projectsString'))


export function attachEventsToModules() {
  const projectHeaders = document.querySelectorAll('.project-header');

  const taskHeaders = document.querySelectorAll('.task-header');

  const mainSection = document.querySelector('.main-section');

  const stepStatus = document.querySelectorAll('input[name="step-status-input"]')

  console.log(stepStatus);

  stepStatus.forEach(stepInput => {
    stepInput.addEventListener('click', (e) => {
      let project = e.target.closest('.project-main-wrapper').dataset.pjIndex;
      let task = e.target.closest('.project-task-wrapper').dataset.tkIndex;

      project = projectsLocalStore[project];
      task = project._projectTasks[task];
      const step = e.target.closest('.step-row').dataset.stIndex;

      task._taskSteps[step]._status = !task._taskSteps[step]._status;
      console.log(task._taskSteps[step]._status);

      renderProjectSidebar(projectsLocalStore)

      localStorage.setItem('projectsString', JSON.stringify(projectsLocalStore))

    })
  })

  mainSection.addEventListener('keyup', (e) => {
    const inEdit = e.target.closest('[data-input]');

    const projectIndex = e.target.closest('.project-main-wrapper').dataset.pjIndex;
    const currentProject = projectsLocalStore[projectIndex];


    if (inEdit) {
      if (inEdit.classList.contains('project')) {

        currentProject[`_${inEdit.dataset.input}`] = inEdit.textContent;

        console.log(e.target);
      }

      if (inEdit.classList.contains('task')) {

        const task = e.target.closest('.project-task-wrapper').dataset.tkIndex;
        const currentTask = currentProject._projectTasks[`${task}`];

        console.log(task);

        currentTask[`_${inEdit.dataset.input}`] = inEdit.textContent;
      }

      if (inEdit.classList.contains('step')) {
        const parentTask = e.target.closest('.project-task-wrapper').dataset.tkIndex;
        const currentStep = currentProject._projectTasks[`${parentTask}`]._taskSteps[e.target.parentNode.dataset.stIndex];

        currentStep._title = inEdit.textContent;
      }

      renderProjectSidebar(projectsLocalStore)

      localStorage.setItem('projectsString', JSON.stringify(projectsLocalStore))
    }
  })

  projectHeaders.forEach((project) => {

    project.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode;

      parent.classList.toggle('hidden');

      parent.addEventListener('click', () => {
        renderProjectMainSection(projectsLocalStore[parent.dataset.pjIndex], [parent.dataset.pjIndex])
      })

    })
  })

  taskHeaders.forEach((task) => {
    task.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode;
      parent.classList.toggle('hidden');
    })
  })
}
