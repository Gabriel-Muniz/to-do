export class Step {
  constructor(title, status = false) {
    this.title = title;
    this.status = status;
  }

  logStep() {
    console.log(`
    
      ----- ${this.title} -----

      Status: ${this.status}
    `)
  }

  changeStatus(){
    this.status = !this.status;
  }
}