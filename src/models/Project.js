export class Project {
  constructor(title, description, dueDate, priority, projectTasks = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectTasks = projectTasks;
  }

  logProject() {
    console.log(`
      ----- ${this.title} // ${this.dueDate} -----

      Description: ${this.description}

      Priority: ${this.priority};
    `)
  }

  logProjectTasks() {

    this.projectTasks.map(task => {
      console.log(task);
    })
  }

  addTask(...tasks) {
    this.projectTasks.push(tasks);
  }

  removeTask(taskIndex){
    if(this.projectTasks.length == 0) return;

    this.projectTasks.splice(taskIndex, 1);
    return 'Lol'
  }
}