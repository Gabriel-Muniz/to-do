export function attachEventsToModules(){
  const projectHeaders = document.querySelectorAll('.project-header');

  const taskHeaders = document.querySelectorAll('.task-header');

  projectHeaders.forEach((project) => {
    project.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode;

      parent.classList.toggle('hidden');
      console.log(e.currentTarget.parentNode);
    })
  })

  taskHeaders.forEach((task) => {
    task.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode;
            
      parent.classList.toggle('hidden');
    })
  })
}

