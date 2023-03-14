<script lang="ts">
    import ListRepositories from "../ListRepositories/ListRepositories.svelte";
    import type IRepository from "../../interfaces/IRepository";
    import { listController } from "../../controllers/listController";

    export let allRepositories: IRepository[] = [];

    let mappedLists = listController.container

    allRepositories = [
        {name: 'portfolio', url:'www.google.com', owner: 'bhS1lva', id:1, onList: '', clicked: false},
        {name: 'conexao api', url:'www.google.com', owner: 'bhS1lva', id:2, onList: '', clicked: false},
        {name: 'licao', url:'www.google.com', owner: 'bhS1lva', id:3, onList: '', clicked:false}
    ]

    let showListScope = false;
    function createNewList(listName:string){  
        if(listName === ''){
            listName = 'new-list';
        }
        if(Object.keys(mappedLists).includes(listName)){
            var regex = new RegExp(`^${listName}`);
            const fakelist = Object.keys(mappedLists).filter(item => regex.test(item));
            listName += fakelist.length;
        }
        showListScope = false;
        listController.createList(listName);
        mappedLists = mappedLists;
    }

    function deleteList(listName:string) {
        listController.deleteList(listName);
        mappedLists = mappedLists;
    }

    function addItem(repo:IRepository, listName:string){
        repo = {...repo, onList:listName, clicked:'blocked'};
        mappedLists[listName] = [...mappedLists[listName], repo];
        mappedLists = mappedLists;
    }

    function removeItem(repo:IRepository){
        mappedLists[repo.onList] = mappedLists[repo.onList].filter(item => item.id !== repo.id)
    }


</script>


<div>
    <div class="list-box">
        {#if allRepositories?.length}
            <ListRepositories
                title={`${allRepositories[0].owner} repositories`}
                content={allRepositories}
                on:AddItem={(e) => addItem(e.detail.repo, e.detail.list)}

            />
        {/if}
        {#each Object.keys(mappedLists) as list}
            <ListRepositories
                title={list}
                content={mappedLists[list]}
                on:DeleteList={(event) => deleteList(event.detail)}
                on:RemoveItem={(event) => removeItem(event.detail)}
            /> 
        {/each}
        {#if showListScope}
            <ListRepositories
                on:CreateList={(event) => createNewList(event.detail)}
            />
        {/if}
    </div>

    <div class="form-box">
        <button class="new-list" on:click={() => showListScope = true}>
            <h2>+create a new list</h2>
        </button>
    </div>

</div>

<style>
    .list-box{
        display: flex;
        gap: 70px;
        justify-content: space-evenly;
        flex-flow: row wrap;
    }
    .form-box{
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
</style>