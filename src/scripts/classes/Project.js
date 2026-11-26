export class Project {
  constructor(
    id,
    title,
    dueDate,
    description,
    priority = 2,
    projectTasks = [],
  ) {
    this.id = id === null ? crypto.randomUUID() : id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.projectTasks = projectTasks;

    if (dueDate === null) {
      const auxDateToday = new Date();
      this.dueDate = new Date(
        Date.UTC(
          auxDateToday.getUTCFullYear(),
          auxDateToday.getUTCMonth(),
          auxDateToday.getUTCDate(),
        ),
      ).toISOString();

      return;
    }

    this.dueDate = dueDate;
  }

  get projectLog() {
    const logString = `
        --== ${this.title} ==--
        Due date: ${this.dueDate}
        Description: ${this.description}
        Priority: ${this.priority}
        Tasks: ${this.projectTasks.map((task) => task.taskLog)}
        `;
    return logString;
  }

  addTask(task) {
    this.projectTasks.push(task);
  }

  removeTask(id) {
    const auxTasks = this.projectTasks;
    auxTasks.splice(
      auxTasks.findIndex((task) => task.id === id),
      1,
    );
  }

  removeItem(id) {
    this.removeTask(id);
  }
}
