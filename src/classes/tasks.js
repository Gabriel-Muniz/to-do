export default class Tasks {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }

  getTask(){
    return [this.title, this.description, this.dueDate, this.priority, this.project];
  }

  logTask(){
    console.log(`\tTask: ${this.title}
    Description: ${this.description}
    Due date: ${this.dueDate}
    Priority: ${this.priority}
    Project: ${this.project}`);
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    this._priority = priority;
  }

  get project(){
    return this._project; 
  }

  set project(project) {
    this._project = project;
  }
}