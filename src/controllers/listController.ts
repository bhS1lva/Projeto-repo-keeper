import { writable } from "svelte/store";
import type IRepository from "../interfaces/IRepository";

export let mappedLists = writable({});
export let showScope = writable(false);
export let gitHubContent = writable<IRepository[]>([]);

export const utils = {
    getListReferences: function (storeObj){
        return Object.keys(storeObj).filter(element => typeof(storeObj[element]) !== 'function');
    },
    manageRepoInList: function (listName:string = undefined, repo:IRepository = undefined){
        let list = [];   
        gitHubContent.subscribe(content => list = [...content]);
        if(listName && repo){
            list.map((item, index) => {
                if(item.id === repo.id){
                    const updatedRepo = {
                        ...repo,
                        onList: [...repo.onList, listName],
                        clicked:false
                    };      
                    list[index] = updatedRepo;
                }
            })
        }else if(repo){
            list.forEach(item => {
                item.onList.map((list, index) => {
                    if(item.id === repo.id) item.onList.splice(index, 1);
                });
            });
        }else if(listName){
            list.forEach(item => {
                item.onList.map((list, index) => {
                    if(list === listName) item.onList.splice(index, 1);
                });
            });
        }
        gitHubContent.set(list);
    }
}

export function createNewList(newListName:string){  
    if(newListName === ''){
        newListName = 'new-list';
    }
    if(Object.keys(mappedLists).includes(newListName)){
        var regex = new RegExp(`^${newListName}`);
        const fakelist = Object.keys(mappedLists).filter(item => regex.test(item));
        newListName += fakelist.length;
    }
    showScope.set(false);
    mappedLists[newListName] = [];
    mappedLists.set(mappedLists);
}

export function deleteList(listName:string) {
    const confirmAction = confirm(`⚠ Are you sure you want to delete the list ${listName}? It can't be undone`);
    if(confirmAction) {
        delete mappedLists[listName];
        utils.manageRepoInList(listName);
    }
    mappedLists.set(mappedLists);
}

export function addItem(repo:IRepository, listName:string){
    utils.manageRepoInList(listName, repo);
    mappedLists[listName] = [...mappedLists[listName], {...repo, onList:[listName], clicked:'blocked'}];
    mappedLists.set(mappedLists);
}

export function removeItem(repo:IRepository){
    const listName = repo.onList[0];
    mappedLists[listName] = mappedLists[listName].filter(item => item.id !== repo.id);
    utils.manageRepoInList(undefined,repo);
    mappedLists.set(mappedLists);
}