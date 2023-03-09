<script lang="ts">
    import ListRepositories from "../ListRepositories/ListRepositories.svelte";

    import type IRepository from "../../interfaces/IRepository";

    export let allRepositories: IRepository[] = [];

    let mappedLists = {}

    // allRepositories = [
    //     {name: 'portfolio', url:'www.google.com', owner: 'bhS1lva', id:1, onList: false},
    //     {name: 'conexao api', url:'www.google.com', owner: 'bhS1lva', id:2, onList: false},
    //     {name: 'licao', url:'www.google.com', owner: 'bhS1lva', id:3, onList: false}
    // ]

    mappedLists['allRepositories'] = allRepositories

    let selectedRepos: IRepository[] = [];
    mappedLists['selectedRepos'] = selectedRepos
    
    function addOnList(repo: IRepository) {
        allRepositories.map((item, index) => {
            if(item.id === repo.id){
                allRepositories[index] = {...repo, onList: true}
                selectedRepos = [...selectedRepos, {...repo, onList: true}]
            }
        })
    }

    function removeFromList(repo: IRepository) {
        allRepositories.map((item, index) => {
            if(item.id === repo.id){
                allRepositories[index] = {...repo, onList: false}
                selectedRepos = selectedRepos.filter(item => item.id !== repo.id)
            }
        })
    }

    function manageList(repo: IRepository){
        if(repo.onList){
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
    
</script>

<div class="list-box">
    {#if allRepositories?.length}
        <ListRepositories
            info={{
                title:`${allRepositories[0].owner} repositories`,
                list:allRepositories,
                actions: false
            }}
            on:HandleList={(event) => manageList(event.detail)}
        />
    {/if}

    {#if Object.keys(mappedLists).includes('selectedRepos')}
    <ListRepositories
        info={{
            title:'All saved repositories',
            list:selectedRepos,
            actions: true
        }}
        on:HandleList={(event) => removeFromList(event.detail)}
        on:ClearList={(event) => clearList(event.detail)}
        on:DeleteList={() => deleteList('selectedRepos')}
    />
    {/if}

</div>

<style>
    .list-box{
        border: 1px solid red;
        display: flex;
        gap: 70px;
        justify-content: space-evenly;
        flex-flow: row wrap;
    }
</style>