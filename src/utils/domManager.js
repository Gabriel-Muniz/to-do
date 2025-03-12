import { renderProjectMainSection, renderProjectSidebar } from "../modules/projectView.js";

const projectsLocalStore = JSON.parse(localStorage.getItem('projectsString'))


export function attachEventsToModules() {
  const projectHeaders = document.querySelectorAll('.project-header');

  const taskHeaders = document.querySelectorAll('.task-header');

  const mainSection = document.querySelector('.main-section');

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
