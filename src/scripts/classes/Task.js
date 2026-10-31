export class Task {
    constructor(title, dueDate = new Date(), taskSteps = []) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.taskSteps = taskSteps;
    }

    get progress() {
        const currentSteps = this.taskSteps;
        const taskMilestone = currentSteps.length;
        const completedSteps = currentSteps.filter(step => step.status === true).length;
        const progressPercentage = (completedSteps / taskMilestone * 100).toFixed(2);
        return Number(progressPercentage);
    }

    get taskLog() {
        const logString = `
            ==-- ${this.title} --==
            Due date: ${this.dueDate}
            Progress: ${this.progress}%
            Steps: ${this.taskSteps.map(step => step.stepLog)}
        `

        return logString
    };

    changeStatus() {
        this.status = !this.status
    };

    addStep(...step) {
        this.taskSteps.push(...step);
    }

    removeStep(index) {
        this.taskSteps.splice(index, 1)
    };
}