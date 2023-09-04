import "./css/base.css";
import { Task, User } from "./js/utils";
import node from "./js/nodes"
let count =  Number(node.taskPending.firstChild.textContent)
node.inputNewTodo.addEventListener('keydown', validateTask({}))
node.buttonClear.addEventListener('click', clearTask)
node.footer.classList.add('visible')
node.main.classList.add('visible')

function usingStorage(){
    const structure = JSON.parse(localStorage.getItem('mydayapp-js'))
    structure.forEach(bucket => {
        if(bucket){
            for(let j =0; j<bucket.length; j++){
                structureTaskAdd(bucket[j][0])
            }
        }
    })
}
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
                const user = new User(50)
                    user.table = JSON.parse(localStorage.getItem('mydayapp-js'))
                if(edit){
                    console.log(event)
                    user.deleteKey(nodes[1].innerText)
                    nodes[0].classList.remove('editing')
                    nodes[1].innerText = task.title
                    user.addTask(task.title.trim(), task.completed)
                    localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
                }
                else{
                user.addTask(task.title.trim(), task.completed)
                localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
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
    node.footer.classList.remove('visible')
            node.main.classList.remove('visible')
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
            const child = node.childNodes[0].childNodes[0]
            child.click()
            // user.deleteKey(node.innerHTML)
            // localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
        }
    });
}
function inputLogic(node){
    const user = new User(50)
    user.table = JSON.parse(localStorage.getItem('mydayapp-js'))
    return function(event){
        node.classList.toggle('completed')
        if(event.target.offsetParent.className == 'completed'){
            user.addValue(event.target.nextSibling.innerText.trim(), true)
            localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
            console.log(user)
            count--
            pendingTask()
        }
        else{
            user.addValue(event.target.nextSibling.innerText.trim(), false)
            localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
            count++
            console.log(user)
            pendingTask()
        }
    }
}
pendingTask()
usingStorage()