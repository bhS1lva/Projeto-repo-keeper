<script lang="ts">
    import ListRepositories from "../ListRepositories/ListRepositories.svelte";

    import type IRepository from "../../interfaces/IRepository";
    import { listController } from "../../controllers/listController";

    export let allRepositories: IRepository[] = [];

    let mappedLists = listController.container;

    allRepositories = [
        {name: 'portfolio', url:'www.google.com', owner: 'bhS1lva', id:1, onList: [], clicked: false},
        {name: 'conexao api', url:'www.google.com', owner: 'bhS1lva', id:2, onList: [], clicked: false},
        {name: 'licao', url:'www.google.com', owner: 'bhS1lva', id:3, onList: [], clicked:false}
    ]

    let selectedRepos: IRepository[] = [];

    function addOnList(repo: IRepository) {
        allRepositories.map((item, index) => {
            if(item.id === repo.id){
                allRepositories[index] = {...repo, clicked: true}
                selectedRepos = [...selectedRepos, {...repo, clicked: true}]
            }
        })

    }

    function removeFromList(repo: IRepository) {
        allRepositories.map((item, index) => {
            if(item.id === repo.id){
                allRepositories[index] = {...repo, clicked: false}
                selectedRepos = selectedRepos.filter(item => item.id !== repo.id)
            }
        })
    }

    function manageList(repo: IRepository){
        if(repo.clicked){
            removeFromList(repo)
        } else {
            addOnList(repo)
        }
    }

    function clearList(list: IRepository[]) {
        list.map(repo => (
            removeFromList(repo)
        ))
    }

    function deleteList(list: string) {
        delete mappedLists[list]
        mappedLists = mappedLists //this reassingment was made to trigger the reactivity of svelte
    }

    function createNewList(listName){  
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

    let showListScope = false;

</script>


<div>
    
    <div class="list-box">
        {#if allRepositories?.length}
            <ListRepositories
                title={`${allRepositories[0].owner} repositories`}
                content={allRepositories}
            />
        {/if}
        {#each Object.keys(mappedLists) as list}
            <ListRepositories
                title={list}
                content={mappedLists[list]}
                
            /> 
        {/each}
        {#if showListScope}
            <ListRepositories
                on:CreateList={(event) => createNewList(event.detail)}
            />
        {/if}
    </div>

    <div class="form-box">
        <button class="new-list" on:click={() => showListScope = !showListScope}>
            <h2>+create a new list</h2>
        </button>
    </div>

</div>

<style>
    .list-box{
        border: 1px solid red;
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