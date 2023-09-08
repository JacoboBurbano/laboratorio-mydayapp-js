import { usingStorage } from "..";
window.addEventListener('hashchange', routes, false)
window.addEventListener('DOMContentLoaded', routes, false)
export function routes() {
    switch (location.hash) {
        case '#/pending':
            usingStorage({pending: true})
            break;
        case '#/completed':
            usingStorage({completed: true})
            break;
        case '#/':
            usingStorage()
        default:
            break;
    }
}