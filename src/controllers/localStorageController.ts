import type IRepository from "../interfaces/IRepository";
import { mappedLists, utils } from "../controllers/listController";

export const localStorageController = {
    save: function(listName:string, list:IRepository[]){
        localStorage.setItem(`${listName}`, JSON.stringify(list));
    },
    editContent: function(listName:string, repo:IRepository,mode:string = 'add'){
        let content = JSON.parse(localStorage[listName]);
        if(mode === 'remove'){
            content = content.filter(item => item.id !== repo.id);
            localStorage[listName] = JSON.stringify([...content]);
        } else if (mode === 'clear'){
            localStorage[listName] = '[]';
        } else {
            localStorage[listName] = JSON.stringify([...content, repo]);
        }
    },
    delete: function(listName:string){
        localStorage.removeItem(listName);
    },
    render: function(){
        utils.getListReferences(localStorage).forEach(listName => {   
            let content = JSON.parse(localStorage[listName]);
            if(content.length){
                mappedLists[listName] = [...content];
                mappedLists[listName].forEach(repo => {
                    utils.manageRepoInList(undefined,repo);
                });
            } else {
                mappedLists[listName] = [];
            }
            mappedLists.set(mappedLists);
        });
    }
}