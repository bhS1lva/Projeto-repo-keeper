<script lang="ts">
    import ListRepositories from "../ListRepositories/ListRepositories.svelte";
    import type IRepository from "../../interfaces/IRepository";
    import { listController } from "../../controllers/listController";

    export let allRepositories: IRepository[] = [];

    let mappedLists = listController.container

    allRepositories = [
        {name: 'portfolio', url:'www.google.com', owner: 'bhS1lva', id:1, onList: [], clicked: false},
        {name: 'conexao api', url:'www.google.com', owner: 'bhS1lva', id:2, onList: [], clicked: false},
        {name: 'licao', url:'www.google.com', owner: 'bhS1lva', id:3, onList: [], clicked:false}
    ]

    let showListScope = true;
    
    function createNewList(newListName:string){  
        if(newListName === ''){
            newListName = 'new-list';
        }
        if(Object.keys(mappedLists).includes(newListName)){
            var regex = new RegExp(`^${newListName}`);
            const fakelist = Object.keys(mappedLists).filter(item => regex.test(item));
            newListName += fakelist.length;
        }
        showListScope = false;
        listController.createList(newListName);
        mappedLists = mappedLists;
    }

    function deleteList(listName:string) {
        listController.deleteList(listName);
        mappedLists = mappedLists;
    }

    function addItem(repo:IRepository, listName:string){
        allRepositories.map((item, index) => {
            if(item.id === repo.id){
                repo = {
                    ...repo,
                    onList: [...repo.onList, listName],
                    clicked:false
                };      
                allRepositories[index] = repo;
            } 
        })
        repo = {...repo, clicked:'blocked'};
        mappedLists[listName] = [...mappedLists[listName], repo];
        mappedLists = mappedLists;
    }

    function removeItem(repo:IRepository, list:string){
        mappedLists[list] = mappedLists[list].filter(item => item.id !== repo.id)
        
    }
</script>

<div class="list-box">
    {#if allRepositories?.length}
        <ListRepositories
            title={`${allRepositories[0].owner} repositories`}
            content={allRepositories}
            on:AddItem={(e) => addItem(e.detail.repo, e.detail.list)}
            on:DeleteList={() => allRepositories = []}
            on:CreateListModal={() => showListScope = true}
        />
    {/if}
    {#each Object.keys(mappedLists) as list}
        <ListRepositories
            title={list}
            content={mappedLists[list]}
            on:DeleteList={(event) => deleteList(event.detail)}
            on:RemoveItem={(event) => removeItem(event.detail.repo, event.detail.list)}
        /> 
    {/each}
    {#if showListScope}
        <ListRepositories
            on:CreateList={(event) => createNewList(event.detail)}
            on:DeleteList={() => showListScope = false}
        />
    {/if}
    {#if !Object.keys(mappedLists).length && !allRepositories.length && !showListScope}
        <img class="no-list-image" src="assets/noListsImage.png" alt="you don’t have any list">
    {/if}
</div>

<div class="new-list-box">
    <button class="new-list" on:click={() => showListScope = true} title="Create a new list">
        <h2>+create a new list</h2>
    </button>
</div>

<style>
    .list-box{
        display: flex;
        gap: 70px;
        justify-content: space-evenly;
        flex-flow: row wrap;
    }
    .new-list-box{
        text-align: center;
        padding: 10px;
    }
    .new-list{
        font-size: 18px;
        background: none;
        border: none;
        color: var(--darker-gray);
        cursor: pointer;
    }
    .new-list:hover{
        text-decoration: underline;
    }
    .no-list-image{
        margin: 10px 20px 40px 20px;
    }
</style>