import "./css/base.css";
import { Task, User } from "./js/utils";
import node from "./js/nodes"
import {addTaskLocal, addValueLocal, deleteKeyLocal, incompleteTask} from "./js/localStorage"
let count =  incompleteTask().length
node.inputNewTodo.addEventListener('keydown', validateTask({}))
node.buttonClear.addEventListener('click', clearTask)
node.footer.classList.add('visible')
node.main.classList.add('visible')
function usingStorage(){
    try{
        const structure = JSON.parse(localStorage.getItem('mydayapp-js'))
    structure.forEach(bucket => {
        if(bucket){
            for(let j =0; j<bucket.length; j++){
                structureTaskAdd(bucket[j][0])
            }
        }
    })
    }
    catch(error){
        return
    }
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
                    // user.table = JSON.parse(localStorage.getItem('mydayapp-js'))
                if(edit){
                    deleteKeyLocal(nodes[1].innerText)
                    nodes[0].classList.remove('editing')
                    nodes[1].innerText = event.target.value
                    addTaskLocal(event.target.value)
                    // localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
                }
                else{
                structureTaskAdd(event.target.value)
                addTaskLocal(event.target.value)
                // localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
                node.inputNewTodo.value = ''
                tasks()
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
    if(!localStorage.getItem('mydayapp-js')){
        return
    }
    else{
        node.footer.classList.remove('visible')
        node.main.classList.remove('visible')   
    }
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
            const child = node.childNodes[0].childNodes[0]
            child.click()
            deleteKeyLocal(node.innerHTML)
            // user.deleteKey(node.innerHTML)
            // localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
        }
    });
}
function inputLogic(node){
    // user.table = JSON.parse(localStorage.getItem('mydayapp-js'))
    return function(event){
        node.classList.toggle('completed')
        if(event.target.offsetParent.className == 'completed'){
            addValueLocal(event.target.nextSibling.innerText, true)
            // localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
            count--
            pendingTask()
        }
        else{
            addValueLocal(event.target.nextSibling.innerText, false)
            // localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
            count++
            pendingTask()
        }
    }
}
pendingTask()
usingStorage()
tasks()