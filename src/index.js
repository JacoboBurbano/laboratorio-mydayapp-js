import "./css/base.css";
import node from "./js/nodes"
import {addTaskLocal, addValueLocal, deleteKeyLocal, getKeyLocal} from "./js/localStorage"
import {countPendingLogic, pendingTask} from './js/updateCount'
import { routes } from "./js/hashRouter";
node.inputNewTodo.addEventListener('keydown', validateTask({}))
node.buttonClear.addEventListener('click', clearTask)
node.footer.classList.add('visible')
node.main.classList.add('visible')
export function usingStorage({pending= false, completed= false} = {}){
    try{
        node.listUnordened.innerHTML = ''
        const structure = JSON.parse(localStorage.getItem('mydayapp-js'))
    structure.forEach(bucket => {
        if(bucket){
            for(let j =0; j<bucket.length; j++){
                if(completed === false && pending === false){
                    structureTaskAdd(bucket[j][0], bucket[j][1])
                }
                else if(completed === true){
                    if(bucket[j][1] === true){
                        structureTaskAdd(bucket[j][0], bucket[j][1])
                    }
                }
                else if(pending === true){
                    if(bucket[j][1] === false){
                        structureTaskAdd(bucket[j][0], bucket[j][1])
                    }
                }
            }
        }
    })
    }
    catch(error){
        return
    }
}
function structureTaskAdd(text, bool = false){
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.classList.add('view')
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.classList.add('toggle')
    input.addEventListener('click', inputLogic(li))
    if(bool){
            input.click()
    }
    const label = document.createElement('label')
    label.innerText = text
    li.addEventListener('dblclick', (event)=> {
        li.classList.toggle('editing')
        inputEdit.setAttribute('autofocus', '')
        inputEdit.placeholder = event.target.innerText
        inputEdit.value = event.target.innerText
        inputEdit.addEventListener('keydown', validateTask({edit : true, parentNode : li, nodeValue : label}))
    })
    const button = document.createElement('button')
    button.classList.add('destroy')
    button.addEventListener('click', (event) =>{
        deleteKeyLocal(event.target.parentNode.childNodes[1].innerText)
        node.listUnordened.removeChild(li)
        if(li.classList.contains('completed')){
            return
        }
        countPendingLogic(false)
        tasks()
    })
    const inputEdit = document.createElement('input')
    inputEdit.classList.add('edit')
    div.append(input ,label, button)
    li.append(div, inputEdit)
    node.listUnordened.appendChild(li)

}
function validateTask({edit = false, parentNode = null, nodeValue = null}){
    return function(event){
        if(event.key === 'Enter'){
            if(!Number(event.target.value) && event.target.value.length !== 0){
                if(edit){
                    deleteKeyLocal(nodeValue.innerText)
                    parentNode.classList.remove('editing')
                    nodeValue.innerText = event.target.value
                    addTaskLocal(event.target.value)
                }
                else{
                if(getKeyLocal(event.target.value.trim())){
                    node.inputNewTodo.value = ''
                }
                else{
                    structureTaskAdd(event.target.value)
                addTaskLocal(event.target.value)
                node.inputNewTodo.value = ''
                countPendingLogic(true)
                tasks()
                }
                }
            }
            else{
                throw new Error('No se puede asignar esa tarea')
            }
        }
        else if(event.key === 'Escape' && edit){
            parentNode.classList.remove('editing')
        }
    }
}
function tasks(){
    if(!localStorage.getItem('mydayapp-js')){
       return false
    }
    else if(node.taskPending.childNodes[0].firstChild.nodeValue < 1){
        node.footer.classList.add('visible')
        node.main.classList.add('visible')
    }
    else{
        let table = JSON.parse(localStorage.getItem('mydayapp-js')) 
        for(let i =0; i < table.length; i++){
            if(table[i]){
                node.footer.classList.remove('visible')
                node.main.classList.remove('visible')   
            }
        }
    }
    }
function clearTask(){
    let array = []
    array.push(...node.listUnordened.children)
    array.forEach(node => {
        if(node.className === 'completed'){
            const child = node.childNodes[0].childNodes[2]
            child.click()
            tasks()
        }
    });
}
function inputLogic(node){
    return async function(event){
        try{
            node.classList.toggle('completed')
        if(event.target.offsetParent.className == 'completed'){
            addValueLocal(event.target.nextSibling.innerText, true)
           countPendingLogic(false)
        }
        else{
            addValueLocal(event.target.nextSibling.innerText, false)
            countPendingLogic(true)
        }
        }
        catch(error){
            return
        }
    }
}
pendingTask()
tasks()