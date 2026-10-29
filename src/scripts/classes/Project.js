export class Project {
    constructor(title, dueDate, description, priority = 2, projectTasks = []) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.projectTasks = projectTasks;
    }

    get projectLog() {
        const logString = `
        --== ${this.title} ==--
        Due date: ${this.dueDate}
        Description: ${this.description}
        Priority: ${this.priority}
        Tasks: ${this.projectTasks.map(task => task.taskLog)}
        `
        return logString;
    }

    addTask(task) {
        this.projectTasks.push(task);
    }

    removeTask(index) {
        this.projectTasks.splice(index, 1);
    }
}