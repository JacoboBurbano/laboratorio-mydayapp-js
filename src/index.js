import "./css/base.css";

import { Task, User } from "./js/utils";
import node from "./js/nodes"
const user = new User()
function tasks(){
    if(user.tasks.length === 0){
    node.footer.classList.add('visible')
    node.main.classList.add('visible')
    
    }
    else {
        node.footer.classList.remove('visible')
        node.main.classList.remove('visible')
    }
}
tasks()