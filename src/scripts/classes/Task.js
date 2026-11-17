export class Task {
    constructor(id, title, dueDate, taskSteps = []) {
        this.id = (id === null) ? crypto.randomUUID() : id;
        this.title = title;
        this.dueDate = (dueDate === null) ? new Date() : dueDate;
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

    removeStep(id) {
        const auxSteps = this.taskSteps;
        auxSteps.splice(auxSteps.findIndex(step => step.id === id), 1)
    };

    removeItem(id){
        this.removeStep(id);
    }
}