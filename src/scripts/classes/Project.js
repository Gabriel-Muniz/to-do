export class Project {
    constructor(title, dueDate = new Date(), description, priority = 2, projectTasks = []) {
        this._id = crypto.randomUUID();
        this._title = title;
        this._dueDate = dueDate;
        this._description = description;
        this._priority = priority;
        this._projectTasks = projectTasks;
    }

    set dueDate(newDate) {
        if (newDate == null) {
            this._dueDate = new Date();
        }
    }

    get projectLog() {
        const logString = `
        --== ${this._title} ==--
        Due date: ${this._dueDate}
        Description: ${this._description}
        Priority: ${this._priority}
        Tasks: ${this._projectTasks.map(task => task.taskLog)}
        `
        return logString;
    }

    addTask(task) {
        this._projectTasks.push(task);
    }

    removeTask(index) {
        this._projectTasks.splice(index, 1);
    }
}