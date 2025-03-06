export class Project {
  constructor(title, description, dueDate, priority, projectTasks = []) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._projectTasks = projectTasks;
  }

  get title(){
    return this._title;
  }

  set title(newTitle){
    this._title = newTitle;
  }

  get description(){
    return this._description;
  }

  set description(newDescription){
    this._description = newDescription;
  }

  get dueDate(){
    return this._dueDate;
  }

  set dueDate(newDueDate){
    this._dueDate = newDueDate;
  }

  get priority(){
    return this._priority;
  }

  set priority(newPriority){
    this._priority = newPriority;
  }

  get projectTasks(){
    return this._projectTasks;
  }

  set projectTasks(newProjectTasks){
    if(Array.isArray(newProjectTasks)){
      this._projectTasks = newProjectTasks;
    }
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