export class Task {
  constructor({id, title, completed = false}){
    this.id = id
    this.title = title
    this.completed = completed
  }
}
export class User {
  constructor(){
    this.tasks = []
  }
  addTask(task){
    this.tasks.push(task)
  }
}
