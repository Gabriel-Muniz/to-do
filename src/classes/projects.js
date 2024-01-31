import Tasks from "./tasks";

export let projectArray = [];

export default class Project {
  constructor(title) {
    this.title = title;
    this.taskArray = [];

    projectArray.push(this);
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  addTask(task) {
    this.taskArray.push(task);
  }

  logTasks() {
    console.log(this.title);
    this.taskArray.forEach((element) => {
      element.logTask();
    });
  }
}
