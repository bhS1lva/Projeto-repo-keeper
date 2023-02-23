<script lang="ts">
    import { check_outros } from "svelte/internal";
    import { slide } from "svelte/types/runtime/transition";
    import type IRepository from "../../interfaces/IRepository";
    import ListRepositories from "../ListRepositories/ListRepositories.svelte";

    export let allRepositories: IRepository[] | null = null;

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

<div class="component-content">
    {#if allRepositories}
        <ListRepositories
            title="{allRepositories[0].owner} repositories"
            lista={allRepositories}
            on:Click={(event) => {manageList(event.detail)}}
        />
    {/if}
    
    {#if selectedRepos.length}
        <ListRepositories
            title="Saved repositories"
            lista={selectedRepos}
            on:Click={(event) => {manageList(event.detail)}}
        />
    {/if}
</div>

<style>
    *{
        font-family: Consolas, "courier new";
    }
    .listed-repository{
        display: flex;
        align-items: center;
        padding-left: 30px;
        font-size: 20px;
    }
    .component-content{
        display: inline-flex;
        gap: 50px;
    }
    .title-box{
        display: inline-flex;
        align-items: center;
        gap: 10px;
    }
    .title-box button {
        padding: 3px;
    }
</style>