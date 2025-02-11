export default class Task {
  constructor(
    title,
    dueDate,
    priority = "Medium",
    progress = 0,
    taskSteps = []
  ) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.progress = progress;
    this.taskSteps = taskSteps;
  }

  addStepToTask(...args) {
    args.map((step) => this.taskSteps.push(step));
  }

  calcProgress() {
    const milestones = this.taskSteps.length;

    const stepsDone = this.taskSteps.filter(
      (step) => step.status == true
    ).length;

    this.progress = ((stepsDone / milestones) * 100).toFixed(2);
  }

  logTask() {
    for (const [key, value] of Object.entries(this)) {
      console.log(`Key: ${key} / Value: ${value}`);
    }
  }
}
