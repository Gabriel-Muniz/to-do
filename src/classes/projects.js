import Tasks from "./tasks";

export let projectArray = [];

export default class Project {
  constructor(title) {
    this.title = title;
    this.taskArray = [];

    projectArray.push(this);
    this.projectId = projectArray.length-1;

  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get projectId(){
    return this._projectId;
  }

  set projectId(projectId){
    this._projectId = projectId;
  }

  addTask(task) {
    this.taskArray.push(task);
  }

  logTasks() {
    console.log(this.title);
    this.taskArray.forEach((element) => {
      element.logTask();
    });
    console.log("Project id: ", this.projectId);
  }
}
