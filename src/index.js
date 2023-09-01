import "./css/base.css";
import { Task, User } from "./js/utils";
import node from "./js/nodes"
let count =  Number(node.taskPending.firstChild.textContent)
node.inputNewTodo.addEventListener('keydown', validateTask({}))
node.buttonClear.addEventListener('click', clearTask)
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
    input.addEventListener('click', inputLogic(li))
    const label = document.createElement('label')
    label.innerText = text
    li.addEventListener('dblclick', (event)=> {
        li.classList.toggle('editing')
        // console.log(event.target.parentElement.parentNode.className === editing)
        inputEdit.value = event.target.innerText
        inputEdit.addEventListener('keydown', validateTask({edit : true, nodes : [li, label]}))
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
function validateTask({edit = false, nodes = null}){
    return function(event){
        if(event.key === 'Enter'){
            if(!Number(event.target.value) && event.target.value.length !== 0){
                const task = new Task({title: event.target.value})
                if(edit){
                    console.log(event)
                    user.deleteKey(nodes[1].innerText)
                    nodes[0].classList.remove('editing')
                    nodes[1].innerText = task.title
                    user.addTask(task.title.trim(), task.completed)
                }
                else{
                user.addTask(task.title.trim(), task.completed)
                node.inputNewTodo.value = ''
                tasks()
                structureTaskAdd(task.title)
                count++
                pendingTask()
                }
            }
            else{
                throw new Error('No se puede asignar esa tarea')
            }
        }
        else if(event.key === 'Escape' && edit){
            nodes[0].classList.remove('editing')
        }
    }
}
function tasks(){
            node.footer.classList.remove('visible')
            node.main.classList.remove('visible')
    }
function pendingTask(){
    if(count != 1){
        node.taskPending.innerHTML = `<strong>${count}<strong/> items left`
    }
    else{
        node.taskPending.innerHTML = `<strong>${count}<strong/> item left`
    }
}
function clearTask(){
    let array = []
    array.push(...node.listUnordened.children)
    array.forEach(node => {
        if(node.className === 'completed'){
            inputLogic(node)
            user.deleteKey(node.innerHTML)
        }
    });
}
function inputLogic(node){
    // node.classList.add('completed')
    return function(event){
        node.classList.toggle('completed')
        if(event.target.offsetParent.className == 'completed'){
            user.addValue(event.target.nextSibling.innerText.trim(), true)
            count--
            pendingTask()
        }
        else{
            user.addValue(event.target.nextSibling.innerText.trim(), false)
            count++
            pendingTask()
        }
    }
}
pendingTask()
