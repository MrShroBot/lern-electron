/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const fs = require('fs');
function createFolderList(path, el){
    let files = fs.readdirSync(path, {withFileTypes:true});

    let subList = '<ul>';
    files.forEach(file => {
        el.innerHTML += `<li>${file.name}</li>`;
    });
    subList += '</ul>';
    el.innerHTML += subList;

    [...el.children[0].children].forEach(child => {
        let firstClick = child.addEventListener('click',event =>{
            createFolderList(path + child.textContent +'\\', child)
        }, {once: true});
    });
}

let list = document.querySelector('#files');
createFolderList('C:\\Users\\SA-21-939\\Documents\\',list);

