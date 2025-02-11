export default class Project {
  constructor(title, description, dueDate, projectTasks = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.projectTasks = projectTasks;
  }

  addTaskToProject(...args) {
    args.map((task) => this.projectTasks.push(task));
  }
}
