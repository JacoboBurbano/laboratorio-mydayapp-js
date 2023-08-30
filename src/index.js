import "./css/base.css";
import { Task, User } from "./js/utils";
import node from "./js/nodes"
node.inputNewTodo.addEventListener('keydown', validateTask)
node.footer.classList.add('visible')
node.main.classList.add('visible')
const user = new User(50)
console.log(user)
function structureTaskAdd(text){
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.classList.add('view')
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.classList.add('toggle')
    input.addEventListener('click', (event) => {
        li.classList.toggle('completed')
        if(event.target.offsetParent.className){
            user.addValue(event.target.nextSibling.innerText.trim(), true)
        }
        else{
            user.addValue(event.target.nextSibling.innerText.trim(), false)
        }
        console.log(user)
        // console.log(user)
    })
    const label = document.createElement('label')
    label.innerText = text
    li.addEventListener('dblclick', (event)=> {
        li.classList.toggle('editing')
        // console.log(event.target.parentElement.parentNode.className === editing)
        inputEdit.value = event.target.innerText
        inputEdit.addEventListener('keydown', validateTask)
    })
    const button = document.createElement('button')
    button.classList.add('destroy')
    const inputEdit = document.createElement('input')
    inputEdit.classList.add('edit')
    inputEdit.setAttribute('autofocus', '')
    div.append(input ,label, button)
    li.append(div, inputEdit)
    node.listUnordened.appendChild(li)

}
function validateTask(event){
    if(event.key === 'Enter'){
        if(!Number(event.target.value) && event.target.value.length !== 0){
            const task = new Task({title: event.target.value})
            user.addTask(task.title.trim(), task.completed)
            console.log(user)
            tasks()
            structureTaskAdd(task.title)
        }
        else{
            throw new Error('No se puede asignar esa tarea')
        }
    }
}
function editTask(event){
    if(event.key === 'Enter'){
        if(!Number(event.target.value) && event.target.value.length !== 0){
        }
        else{
            throw new Error('No se puede asignar esa tarea')
        }
    }
}
function tasks(){
            node.footer.classList.remove('visible')
            node.main.classList.remove('visible')
    }
// function putTask(reload = false){
//     if(reload == false){
//         for(let i = 0; i < user.table.length; i++){
//             if(user.table[i]){
//                 for(let j = 0; j < user.table[i].length; j++){
//                     if(reload == false){
//                         structureTaskAdd(user.table[i][j][0], user.table[i][j][1])
//                     }
//                    else{
//                         structureTaskAdd(user.table[i][j][0], user.table[i][j][1], true)
//                    }
//                 }
//             }
//         }
//     }
// }
// function creatingStructure(){
//     for(let i = 0; i < user.table.length; i++){
//         if(user.table[i]){
//             for(let j = 0; j < user.table[i].length; j++){
//     structureTaskAdd(user.table[i][j][0], {clean: false})}}}
// }
