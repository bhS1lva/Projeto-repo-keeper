import { writable } from "svelte/store";
import type IRepository from "../interfaces/IRepository";
import { localStorageController } from "./localStorageController";

export let mappedLists = writable({});
export let showScope = writable(false);
export let gitHubContent = writable<IRepository[]>([]);

export const utils = {
    getListReferences: function (storeObj){
        return Object.keys(storeObj).filter(element => typeof(storeObj[element]) !== 'function');
    },
    manageRepoInList: function (listName:string = undefined, repo:IRepository = undefined,mode = ''){
        let list = [];   
        gitHubContent.subscribe(content => list = [...content]);
        if(repo && listName && mode === 'add'){
            list.map((item, index) => { //add a list in repo.inList attribute
                if(item.id === repo.id){
                    repo = {
                        ...repo,
                        inList: [...repo.inList, listName],
                        clicked:false
                    };      
                    list[index] = repo;
                }
            })
        }else if(repo && listName && mode === 'remove'){ //remove a specific list from repo.inList attribute
            list.forEach(item => {
                item.inList.map((list, index) => {
                    if(item.id === repo.id && list === listName) item.inList.splice(index, 1);
                });
            });
        }else if(listName && mode === ''){ //remove all lists from repo.inList attribute
            list.forEach(item => {
                item.inList.map((list, index) => {
                    if(list === listName) item.inList.splice(index, 1);
                });
            });
        }else if(repo && mode === ''){ //add a list in repo.inList attribute based on the localStorage info
            list.map(item => {
                if(item.id === repo.id) {
                    item.inList = [...item.inList, repo.inList]
                    item.inList = item.inList.flatMap(index => index)
                }
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
    localStorageController.save(newListName,[]);
}

export function deleteList(listName:string) {
    const confirmAction = confirm(`⚠ Are you sure you want to delete the list ${listName}? It can't be undone`);
    if(confirmAction) {
        delete mappedLists[listName];
        utils.manageRepoInList(listName);
    }
    mappedLists.set(mappedLists);
    localStorageController.delete(listName);
}

export function clearList(listName){
    utils.manageRepoInList(listName);
    mappedLists[listName] = [];
    mappedLists.set(mappedLists);
    localStorageController.editContent(listName, undefined, 'clear')
}

export function addItem(repo:IRepository, listName:string){
    utils.manageRepoInList(listName, repo,'add');
    repo = {...repo, inList:[listName], clicked:'blocked'}
    mappedLists[listName] = [...mappedLists[listName], repo];
    mappedLists.set(mappedLists);
    localStorageController.editContent(listName, repo);  
}

export function removeItem(repo:IRepository){
    const listName = repo.inList[0];
    mappedLists[listName] = mappedLists[listName].filter(item => item.id !== repo.id);
    utils.manageRepoInList(listName,repo,'remove');
    mappedLists.set(mappedLists);
    localStorageController.editContent(listName, repo, 'remove');
}