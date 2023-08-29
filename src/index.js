import "./css/base.css";
import { Task, User } from "./js/utils";
import node from "./js/nodes"
node.inputNewTodo.addEventListener('keydown', validateTask)
const user = new User(50)
console.log(user)
function structureTaskAdd(text, boolean = false){
    // node.listUnordened.innerHTML = ''
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.classList.add('view')
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.classList.add('toggle')
    const label = document.createElement('label')
    label.innerText = text
    const button = document.createElement('button')
    button.classList.add('destroy')
    div.append(input ,label, button)
    li.appendChild(div)
    node.listUnordened.appendChild(li)

}
function validateTask(event){
    if(event.key === 'Enter'){
        if(!Number(event.target.value) && event.target.value.length !== 0){
            const task = new Task({title: event.target.value})
            user.addTask(task.title.trim(), task.completed)
            console.log(user)
            putTask()
            tasks()
            // structureTaskAdd(event.target.value)
        }
        else{
            throw new Error('No se puede asignar esa tarea')
        }
    }
}
function tasks(){
    for(let i = 0; i < user.table.length; i++){
        if(user.table[i] === null){
            node.footer.classList.add('visible')
            node.main.classList.add('visible')
            
            }
        else {
                node.footer.classList.remove('visible')
                node.main.classList.remove('visible')
        }   
    }
}
function putTask(){
    for(let i = 0; i < user.table.length; i++){
        if(user.table[i]){
            for(let j = 0; j < user.table[i].length; j++){
                return structureTaskAdd(user.table[i][j][0], user.table[i][j][1])
            }
        }
    }
}
putTask()
tasks()