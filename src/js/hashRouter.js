import { usingStorage } from "..";
import node from './nodes'
window.addEventListener('hashchange', routes, false)
window.addEventListener('DOMContentLoaded', routes, false)
export function routes() {
    switch (location.hash) {
        case '#/pending':
            usingStorage({pending: true})
            nodeIteration(node.buttonsHash, location.href)
            break;
        case '#/completed':
            usingStorage({completed: true})
            nodeIteration(node.buttonsHash, location.href)
            break;
        case '#/':
            usingStorage()
            nodeIteration(node.buttonsHash, location.href)
        default:
            break;
    }
}
function nodeIteration(node, nameRoute){
    let array = [...node.children]
    return array.forEach(element => {
        element.childNodes[1].href === nameRoute ? element.childNodes[1].classList.add('selected') : element.childNodes[1].classList.remove('selected')
    });
}