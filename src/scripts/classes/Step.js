export class Step {
  constructor(id, title, status = false) {
    this.id = id === null ? crypto.randomUUID() : id;
    this.title = title;
    this.status = status;
  }

  changeStatus() {
    this.status = !this.status;
  }

  get stepLog() {
    const logString = `
                ==--${this.title}--==
                Status: ${this.status}
        `;

    return logString;
  }
}
