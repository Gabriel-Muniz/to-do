import { renderProjectMainSection } from "../modules/projectView.js";

const projectsLocalStore = JSON.parse(localStorage.getItem('projectsString'))
export function attachEventsToModules() {
  const projectHeaders = document.querySelectorAll('.project-header');

  const taskHeaders = document.querySelectorAll('.task-header');

  projectHeaders.forEach((project) => {
    project.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode;

      parent.classList.toggle('hidden');

      parent.addEventListener('click', () => {
        renderProjectMainSection(projectsLocalStore[parent.dataset.pjIndex])

      })

      console.log(parent.dataset.pjIndex)

    })
  })

  taskHeaders.forEach((task) => {
    task.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode;
      parent.classList.toggle('hidden');
    })
  })
}

