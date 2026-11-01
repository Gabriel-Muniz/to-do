export class Project {
    constructor(id, title, dueDate, description, priority = 2, projectTasks = []) {
        this.id = (id === null) ? crypto.randomUUID() : id;
        this.title = title;
        this.dueDate = (dueDate === null) ? new Date() : dueDate;
        this.description = description;
        this.priority = priority;
        this.projectTasks = projectTasks;
    }

    set dueDate(newDate) {
        if (newDate == null) {
            this.dueDate = new Date();
        }
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