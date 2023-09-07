import { usingStorage } from "..";
window.addEventListener('hashchange', routes, false)
window.addEventListener('DOMContentLoaded', routes, false)
export function routes() {
    switch (location.hash) {
        case '#/pending':
            console.log('mostrar tareas pendientes')
            break;
        case '#/completed':
            console.log('completadas')
            break;
        case '#/':
            usingStorage()
        default:
            break;
    }
}