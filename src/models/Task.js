export class Task {
  constructor(title, dueDate, progress = 0, taskSteps = []) {
    this.title = title;
    this.dueDate = dueDate;
    this.progress = progress;
    this.taskSteps = taskSteps;
  }

  get title(){
    return this._title;
  }

  set title(newTitle){
    this._title = newTitle;
  }

  get dueDate(){
    return this._dueDate;
  }

  set dueDate(newDueDate){
    this._dueDate = newDueDate;
  }

  get progress(){
    let milestones = (100 / this.taskSteps.length).toFixed(2);

    const doneSteps = this.taskSteps.filter((step) => step.status === true);

    this.progress = Math.ceil(doneSteps.length * milestones);

    return this._progress;
  }

  set progress(newProgress){
    this._progress = newProgress
  }

  logTask() {
    console.log(`
      ----- ${this.title} // ${this.dueDate} -----

      Progress: ${this.progress}%

      Steps: ${this.logTaskSteps()}
    `)
  }

  logTaskSteps() {
    this.taskSteps.map(step => {
      console.log(step);
    })
  }

  addStep(...steps){
    this.taskSteps.push(steps);
  }

  removeStep(stepIndex){
    if(this.taskSteps.length == 0) return;

    this.taskSteps.splice(stepIndex, 1);
  }

  // calcProgress(){
  //   let milestones = (100 / this.taskSteps.length).toFixed(2);

  //   const doneSteps = this.taskSteps.filter((step) => step.status === true);

  //   this.progress = Math.ceil(doneSteps.length * milestones);
  // }
}