export default class Step {
  constructor(name, status = false) {
    this.name = name;
    this.status = status;
  }

  changeStatus(){
    this.status = !this.status;
  }
}