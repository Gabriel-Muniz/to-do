export class Step {
  constructor(title, status = false) {
    this._title = title;
    this._status = status;
  }

  get title(){
    return this._title;
  }

  set title(newTitle){
    this._title = newTitle;
  }

  get status(){
    return this._status;
  }

  set status(newStatus){
    this._status = newStatus;
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