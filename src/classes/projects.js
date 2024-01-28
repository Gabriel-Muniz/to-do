import Tasks from "./tasks";

export default class Project {
  constructor(title) {
    this.title = title;
    this.taskArray = [];
  }

  get title() {
    return _title;
  }

  set title(title) {
    this._title = title;
  }

  addTask(task) {
    this.taskArray.push(task);
  }

  logTasks() {
    this.taskArray.forEach(element => {
        element.logTask();
    });
  }
}