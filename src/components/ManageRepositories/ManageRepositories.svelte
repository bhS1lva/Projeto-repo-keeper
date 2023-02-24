<script lang="ts">
    import ListRepositories from "../ListRepositories/ListRepositories.svelte";

    import type IRepository from "../../interfaces/IRepository";

    export let allRepositories: IRepository[] = [];

    allRepositories = [
        {name: 'portfolio', url:'www.google.com', owner: 'bhS1lva', id:1, onList: false},
        {name: 'conexao api', url:'www.google.com', owner: 'bhS1lva', id:2, onList: false},
        {name: 'licao', url:'www.google.com', owner: 'bhS1lva', id:3, onList: false}
    ]

    let selectedRepos: IRepository[] = [];
    
    function addOrRemoveFromList(repo: IRepository, mode: boolean) {
        allRepositories.map((item, index) => {
            if(item.id === repo.id){
                allRepositories[index] = {...repo, onList: mode}
                if(mode){
                    selectedRepos = [...selectedRepos, {...repo, onList: true}]
                } else {
                    selectedRepos = selectedRepos.filter(item => item.id !== repo.id)
                }
            }
        })
    }

    function manageList(repo: IRepository){
        if(repo.onList){
            addOrRemoveFromList(repo, false)//false to remove item from the list
        } else {
            addOrRemoveFromList(repo, true)//true to add item on the list
        }
    }

</script>

<div class="list-box">
    {#if allRepositories}
        <ListRepositories
            title="{allRepositories[0].owner} repositories"
            list={allRepositories}
            on:HandleList={(event) => {manageList(event.detail)}}
        />
    {/if}

    
    {#if selectedRepos.length}
        <ListRepositories
            title="Saved repositories"
            list={selectedRepos}
            on:HandleList={(event) => {manageList(event.detail)}}
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