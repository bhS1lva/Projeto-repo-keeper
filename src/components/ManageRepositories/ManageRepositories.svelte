<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";
    import ListRepositories from "../ListRepositories/ListRepositories.svelte";

    export let allRepositories: IRepository[] | null = null;

    allRepositories = [
        {name: 'projeto1', url:'www.google.com', owner: 'bhS1lva', id:1, onList: false},
        {name: 'projeto2', url:'www.google.com', owner: 'bhS1lva', id:2, onList: false},
        {name: 'projeto3', url:'www.google.com', owner: 'bhS1lva', id:3, onList: false}
    ]

    let selectedRepos: IRepository[] = [];

    function manageList(repo: IRepository){
        const index = selectedRepos.findIndex(item => (item.id === repo.id));

        if(index === -1){
            selectedRepos = [...selectedRepos, repo];
        } else {
            selectedRepos.splice(index, 1);
            //this reassignment was made to trigger the reactivity of svelte
            selectedRepos = selectedRepos;
        }
    }

</script>

<div class="component-content">
    {#if allRepositories}
        <ListRepositories
            title="{allRepositories[0].owner} repositories"
            lista={allRepositories}
            on:Response={(event) => {manageList(event.detail)}}
        />
    {/if}
    
    {#if selectedRepos.length}
        <ListRepositories
            title="Saved repositories"
            lista={selectedRepos}
            on:Response={(event) => {manageList(event.detail)}}
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