export class Step {
    constructor(title, status = false) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.status = status;
    }

    changeStatus() {
        this.status = !this.status
    };

    get stepLog() {
        const logString = `
                ==--${this.title}--==
                Status: ${this.status}
        `

        return logString
    }
}