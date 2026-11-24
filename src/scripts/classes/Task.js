export class Task {
    constructor(id, title, dueDate, taskSteps = []) {
        this.id = (id === null) ? crypto.randomUUID() : id;
        this.title = title;
        this.taskSteps = taskSteps;

        if (dueDate === null) {
            const auxDateToday = new Date();
            this.dueDate = new Date(Date.UTC(auxDateToday.getUTCFullYear(), auxDateToday.getUTCMonth(), auxDateToday.getUTCDate())).toISOString();

            return
        }

        this.dueDate = dueDate;
    }

    get progress() {
        const taskMilestone = this.taskSteps.length;
        const completedSteps = this.taskSteps.filter(step => step.status === true).length;
        let progressPercentage = (completedSteps / taskMilestone * 100);
        progressPercentage = Number.isInteger(progressPercentage) ? progressPercentage.toFixed(0) : progressPercentage.toFixed(2)

        return Number.isNaN(Number(progressPercentage)) ? "\u2014" : `${progressPercentage}%`;
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

    removeItem(id) {
        this.removeStep(id);
    }
}