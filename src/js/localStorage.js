import {Task, User} from './utils'
export function addTaskLocal(key, value = false){
    const task = new Task({title: key, completed: value})
    const user = new User(50)
    if(!JSON.parse(localStorage.getItem('mydayapp-js'))){
        user.addTask(task.title.trim(), task.completed)
        localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
    }
    else{
        let valor = JSON.parse(localStorage.getItem('mydayapp-js'))
        localStorage.clear()
    for(let i = 0; i < valor.length; i++){
        if(valor[i]){
            for(let j=0; j < valor[i].length; j++){
                user.addTask(valor[i][j][0], valor[i][j][1])
            }
        }
    }
    user.addTask(task.title.trim(), task.completed)
    localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
    }
}
export function addValueLocal(key, value){
    const user = new User(50)
    let valor = JSON.parse(localStorage.getItem('mydayapp-js'))
    localStorage.clear()
    for(let i = 0; i < valor.length; i++){
        if(valor[i]){
            for(let j=0; j < valor[i].length; j++){
                user.addTask(valor[i][j][0], valor[i][j][1])
            }
        }
    }
    user.addValue(key, value)
    localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
}
export function deleteKeyLocal(key){
    const user = new User(50)
    let valor = JSON.parse(localStorage.getItem('mydayapp-js'))
    localStorage.clear()
    for(let i = 0; i < valor.length; i++){
        if(valor[i]){
            for(let j=0; j < valor[i].length; j++){
                user.addTask(valor[i][j][0], valor[i][j][1])
            }
        }
    }
    user.deleteKey(key)
    localStorage.setItem('mydayapp-js', JSON.stringify(user.table))
}
export function incompleteTask(){
    let valor = JSON.parse(localStorage.getItem('mydayapp-js'))
    let bool = []
    valor.forEach(bucket => {
        if(bucket){
            bucket.forEach(task => {
                task[1] === false ? bool.push(task[1]) : false
            })
            // bucket[1] === false ? console.log(bucket): false
        }
    });
    return bool
}