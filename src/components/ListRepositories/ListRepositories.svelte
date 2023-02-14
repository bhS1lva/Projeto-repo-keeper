<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";
    import Repository from "./Repository/Repository.svelte";

    export let repositories: IRepository[] | null = null;
    let role: boolean;
    repositories = [
        {name: 'projeto1', url:'www.google.com', owner: 'bhS1lva', id:1}, 
        {name: 'projeto2', url:'www.google.com', owner: 'bhS1lva', id:2}
    ]

    let repoList: IRepository[] = [];

    function manageList(repo: IRepository){
        const index = repoList.findIndex(item => (item.id === repo.id));

        if(index === -1){
            repoList = [...repoList, repo];
        } else {
            repoList.splice(index, 1);
            //this reassignment was made to trigger the reactivity of svelte
            repoList = repoList;
        }
        role = !role
    }

    function clearSearch(){
        repositories = null;
    }

</script>

<div class="component-content">
    {#if repositories}
        <div>
            <div class="title-box">
                <h2>{repositories[0].owner} repositories</h2>
                <button on:click={clearSearch}>X</button>
            </div>
            {#each repositories as repo}
                <div class="listed-repository"> 
                    <Repository {repo}/>
                    <button class:remove-button={role} class="button" on:click={() => manageList(repo)}>+</button>
                </div>
            {/each}
        </div>
    {/if}
    {#if repoList.length}
        <div>
            <h2>Saved repositories</h2>
            <div class="saved-repositories">
                {#each repoList as repo}
                    <Repository {repo}/>
                    <button class="button remove-button" on:click={() => manageList(repo)}>x</button>
                {/each}
            </div>
        </div>
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
    .saved-repositories{
        display: inline-flex;
        align-items: center;
        gap: 5px;
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
    .button{
        padding: 4px 8px;
        border-radius: 10px;
        margin-left: 5px;
        border: 1px solid #ccc;
        transition: 0.3s;
    }
    .remove-button{
        background-color: pink;
        transform: rotate(0.13turn);
    }
</style>