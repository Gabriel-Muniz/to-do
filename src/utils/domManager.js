import { renderProjectMainSection, renderProjectSidebar } from "../modules/projectView.js";
import { renderTaskSidebar } from "../modules/taskView.js";

const projectsLocalStore = JSON.parse(localStorage.getItem('projectsString'))

const inputsEdit = document.querySelectorAll('[data-input]');


export function attachEventsToModules() {
  const projectHeaders = document.querySelectorAll('.project-header');

  const taskHeaders = document.querySelectorAll('.task-header');

  const mainSection = document.querySelector('.main-section');

  mainSection.addEventListener('keyup', (e) => {
    const inEdit = e.target.closest('[data-input]');
    const projectIndex = e.target.parentNode.dataset.pjIndex;
    const currentProject = projectsLocalStore[projectIndex]
    currentProject[`_${inEdit.dataset.input}`] = inEdit.textContent;

    localStorage.setItem('projectsString', JSON.stringify(projectsLocalStore))


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

function attachTwoWayBinding() {

  inputsEdit.forEach(selectedInput => {
    console.log(selectedInput);

    selectedInput.addEventListener('keyup', () => {
      console.log(selectedInput.textContent);
    })
  })
}